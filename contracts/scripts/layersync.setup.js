const { ethers } = require("ethers");
const { createClient } = require("@layerzerolabs/scan-client");
const lzConfig = require("./utils/lzConfig");

async function main() {
  try {
    const networks = process.argv[2].split(",");
    const contractAddresses = process.argv[3].split(",");

    if (networks.length !== contractAddresses.length) {
      throw new Error("Error: Networks and contractAddresses length mismatch.");
    }

    const layersyncAbi = [
      "function setTrustedRemote(uint16 _remoteChainId, bytes _path) external",
      "function setTrustedRemoteAddress(uint16 _remoteChainId, bytes _remoteAddress) external",
      "function balanceOf(address _account) external view returns (uint256)",
      "function sendFrom(address _from, uint16 _dstChainId, bytes _toAddress, uint256 _amount, address _refundAddress, address _zroPaymentAddress, bytes _adapterParams) external payable",
      "function estimateSendFee(uint16 _dstChainId, bytes calldata _toAddress, uint256 _amount, bool _useZro, bytes calldata _adapterParams) external view returns (uint256 nativeFee, uint256 zroFee)",
    ];

    let providers = {};
    let contracts = {};
    let deployerWallets = {};
    let trustedRemotes = {};

    // Set providers, token contracts and deployer wallets
    for (let i = 0; i < networks.length; i++) {
      const network = networks[i];

      providers[network] = new ethers.providers.JsonRpcProvider(
        lzConfig[network].rpcUrl
      );

      contracts[network] = new ethers.Contract(
        contractAddresses[i],
        layersyncAbi,
        providers[network]
      );

      deployerWallets[network] = new ethers.Wallet(
        process.env.PRIVATE_KEY,
        providers[network]
      );
    }

    // Set trusted remotes for each network
    for (let i = 0; i < networks.length; i++) {
      const localNetwork = networks[i];
      const localContract = contracts[localNetwork];

      for (let j = 0; j < networks.length; j++) {
        const remoteNetwork = networks[j];
        const remoteContract = contracts[remoteNetwork];

        if (localNetwork === remoteNetwork) {
          continue;
        }

        if (!trustedRemotes[localNetwork]) {
          trustedRemotes[localNetwork] = [];
        }

        trustedRemotes[localNetwork].push({
          remoteChainName: remoteNetwork,
          remoteChainId: lzConfig[remoteNetwork].chainId,
          remoteAddress: remoteContract.address,
          path: ethers.utils.solidityPack(
            ["address", "address"],
            [remoteContract.address, localContract.address]
          ),
        });
      }
    }

    console.log("\nTrusted remotes on-chain setup started...\n");

    for (let i = 0; i < networks.length; i++) {
      const network = networks[i];
      const contract = contracts[network];
      const deployerWallet = deployerWallets[network];

      const trustedRemotesForTheNetwork = trustedRemotes[network];

      for (let j = 0; j < trustedRemotesForTheNetwork.length; j++) {
        const trustedRemote = trustedRemotesForTheNetwork[j];

        console.log(
          `Setting trusted remote for ${network} to ${trustedRemote.remoteChainId}...`
        );

        const tx = await contract
          .connect(deployerWallet)
          .setTrustedRemoteAddress(
            trustedRemote.remoteChainId,
            trustedRemote.remoteAddress.toLowerCase()
          );

        await tx.wait(1);

        console.log(
          `Trusted remote for ${network} set to ${trustedRemote.remoteChainId} - ${trustedRemote.remoteChainName} network\n`
        );
      }
    }

    console.log("\nTrusted remotes setup completed.\n");

    const mainChain = networks[0];
    const mainContract = contracts[mainChain];
    const mainDeployerWallet = deployerWallets[mainChain];

    const secondaryChain = networks[1];
    const secondaryContract = contracts[secondaryChain];
    const secondaryDeployerWallet = deployerWallets[secondaryChain];

    const initialBalanceRaw = await mainContract.balanceOf(
      mainDeployerWallet.address
    );
    const initialBalance = ethers.utils.formatEther(initialBalanceRaw);
    console.log(`Initial balance: ${initialBalance} tokens on ${mainChain}`);

    console.log(
      `Transfering 250 tokens from ${mainChain} to ${secondaryChain}...`
    );

    const sendFee = await mainContract.estimateSendFee(
      lzConfig[secondaryChain].chainId, // _dstChainId (uint16)
      mainDeployerWallet.address.toLowerCase(), // _toAddress (bytes)
      ethers.utils.parseEther("250"), // _amount (uint256)
      false, // _useZro (bool)
      "0x" // _adapterParams (bytes)
    );
    const nativeFee = sendFee[0];
    console.log({
      nativeFee: ethers.utils.formatEther(nativeFee.toString()),
      mainChain,
      secondaryChain,
      path: ethers.utils.solidityPack(
        ["address", "address"],
        [mainContract.address, secondaryContract.address]
      ),
    });

    const tx = await mainContract.connect(mainDeployerWallet).sendFrom(
      mainDeployerWallet.address, // _from (address)
      lzConfig[mainChain].chainId, // _dstChainId (uint16)
      mainDeployerWallet.address.toLowerCase(), // _toAddress (bytes)
      ethers.utils.parseEther("250"), // _amount (uint256)
      mainDeployerWallet.address, // _refundAddress (address)
      ethers.constants.AddressZero, // _zroPaymentAddress (address)
      "0x", // _adapterParams (bytes)
      {
        value: nativeFee,
      }
    );

    await tx.wait(lzConfig[mainChain].defaultBlockConfs);

    const client = createClient("testnet");

    const { messages } = await client.getMessagesBySrcTxHash(tx.hash);

    console.log(`LayerZero scan tx hash: ${tx.hash}`);
    console.log(`LayerZero scan message: ${messages}`);

    console.log(
      `250 tokens transfered from ${mainChain} to ${secondaryChain} for the address: ${mainDeployerWallet.address}`
    );

    const finalBalanceRaw = await secondaryContract.balanceOf(
      secondaryDeployerWallet.address
    );
    const finalBalance = ethers.utils.formatEther(finalBalanceRaw);
    console.log(
      `Final balance: ${finalBalance} LS tokens on ${secondaryChain}`
    );
  } catch (error) {
    console.error(error);
  }
}

main();

// node scripts/layersync.setup.js arbitrum_goerli,bnb_testnet,scroll_sepolia 0xb75D178dc790b498322086Ed3Ad035A4B2a7448a,0x250661E6A9D755E062c36851f90223e4CEB93035,0x8aB4db3D33c64c3456F040E6B7347A427cCe6360
