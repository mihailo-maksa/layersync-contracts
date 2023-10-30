const hre = require("hardhat");
const lzConfig = require("./lzConfig");

const network = hre.network.name;

module.exports = [
  "LayerSync",
  "LS",
  lzConfig[network].endpoint,
  lzConfig.arbitrum_goerli.chainId,
  hre.ethers.utils.parseEther("1000000"),
];
