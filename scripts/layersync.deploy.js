const hre = require("hardhat");
const constructorArgs = require("./utils/layersync.args");

async function main() {
  const LayerSync = await hre.ethers.getContractFactory("LayerSync");
  const layerSync = await LayerSync.deploy(...constructorArgs);
  await layerSync.deployed();
  console.log(`LayerSync deployed at: ${layerSync.address}`);

  const owner = await layerSync.owner();
  const balanceRaw = await layerSync.balanceOf(owner);
  const balance = hre.ethers.utils.formatEther(balanceRaw);
  console.log(
    `LayerSync balance of ${owner} is: ${balance} LS on ${hre.network.name}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// npx hardhat run scripts/layersync.deploy.js --network arbitrum_goerli
// npx hardhat verify 0xb75D178dc790b498322086Ed3Ad035A4B2a7448a --network arbitrum_goerli --constructor-args scripts/utils/layersync.args.js
// Arbitrum Goerli: 0xb75D178dc790b498322086Ed3Ad035A4B2a7448a

// npx hardhat run scripts/layersync.deploy.js --network bnb_testnet
// npx hardhat verify 0x250661E6A9D755E062c36851f90223e4CEB93035 --network bnb_testnet --constructor-args scripts/utils/layersync.args.js
// BNB Testnet: 0x250661E6A9D755E062c36851f90223e4CEB93035

// npx hardhat run scripts/layersync.deploy.js --network scroll_sepolia
// npx hardhat verify 0x8aB4db3D33c64c3456F040E6B7347A427cCe6360 --network scroll_sepolia --constructor-args scripts/utils/layersync.args.js
// Scroll Sepolia: 0x8aB4db3D33c64c3456F040E6B7347A427cCe6360
