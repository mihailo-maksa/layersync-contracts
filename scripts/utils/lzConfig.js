require("dotenv").config();
const { ethers } = require("ethers");

module.exports = {
  bnb: {
    chainId: 102,
    endpoint: "0x3c2269811836af69497E5F486A85D7316753cf62",
    defaultBlockConfs: 20,
    rpcUrl: "https://bscrpc.com",
  },
  avalanche: {
    chainId: 106,
    endpoint: "0x3c2269811836af69497E5F486A85D7316753cf62",
    defaultBlockConfs: 12,
    rpcUrl: `https://avalanche-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
  },
  polygon: {
    chainId: 109,
    endpoint: "0x3c2269811836af69497E5F486A85D7316753cf62",
    defaultBlockConfs: 512,
    rpcUrl: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
  },
  fantom: {
    chainId: 112,
    endpoint: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
    defaultBlockConfs: 5,
    rpcUrl: `https://rpc.ftm.tools`,
  },
  celo: {
    chainId: 125,
    endpoint: "0x3A73033C0b1407574C76BdBAc67f126f6b4a9AA9",
    defaultBlockConfs: 5,
    rpcUrl: `https://celo-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
  },
  gnosis: {
    chainId: 145,
    endpoint: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
    defaultBlockConfs: 5,
    rpcUrl: `https://gnosis-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
  },
  core: {
    chainId: 153,
    endpoint: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
    defaultBlockConfs: 21,
    rpcUrl: `https://core-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
  },
  goerli: {
    chainId: 10021,
    endpoint: "0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23",
    defaultBlockConfs: 3,
    rpcUrl: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
  },
  arbitrum_goerli: {
    chainId: 10143,
    endpoint: "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab",
    defaultBlockConfs: 3,
    rpcUrl: `https://arbitrum-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
  },
  sepolia: {
    chainId: 10161,
    endpoint: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
    defaultBlockConfs: 3, // non-official
    rpcUrl: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
  },
  scroll_sepolia: {
    chainId: 10214,
    endpoint: "0x6098e96a28E02f27B1e6BD381f870F1C8Bd169d3",
    defaultBlockConfs: 3, // non-official
    rpcUrl: `https://sepolia-rpc.scroll.io`,
  },
  fuji: {
    chainId: 10106,
    endpoint: "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706",
    defaultBlockConfs: 6,
    rpcUrl: `https://avalanche-fuji.infura.io/v3/${process.env.INFURA_API_KEY}`,
  },
  mumbai: {
    chainId: 10109,
    endpoint: "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8",
    defaultBlockConfs: 10,
    rpcUrl: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
  },
  fantom_testnet: {
    chainId: 10112,
    endpoint: "0x7dcAD72640F835B0FA36EFD3D6d3ec902C7E5acf",
    defaultBlockConfs: 7,
    rpcUrl: `https://fantom-testnet.publicnode.com`,
  },
  bnb_testnet: {
    chainId: 10102,
    endpoint: "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1",
    defaultBlockConfs: 5,
    rpcUrl: `https://bsc-testnet.publicnode.com`,
  },
  celo_testnet: {
    chainId: 10125,
    endpoint: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
    defaultBlockConfs: 1,
    rpcUrl: `https://celo-alfajores.infura.io/v3/${process.env.INFURA_API_KEY}`,
  },
  gnosis_testnet: {
    chainId: 10145,
    endpoint: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
    defaultBlockConfs: 1,
    rpcUrl: `https://rpc.chiadochain.net`,
  },
  core_testnet: {
    chainId: 10153,
    endpoint: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1",
    defaultBlockConfs: 1,
    rpcUrl: `https://core-testnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
  },
  defaultAdapterParams: ethers.utils.solidityPack(
    ["uint16", "uint256"],
    [1, 200000]
  ),
};
