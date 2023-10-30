require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-web3");
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");

module.exports = {
  solidity: "0.8.20",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    hardhat: {},
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    arbitrum_goerli: {
      url: `https://arbitrum-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    scroll_sepolia: {
      url: `https://sepolia-rpc.scroll.io`,
      accounts: [process.env.PRIVATE_KEY],
    },
    bnb: {
      url: `https://bscrpc.com`,
      accounts: [process.env.PRIVATE_KEY],
    },
    bnb_testnet: {
      url: `https://bsc-testnet.publicnode.com`,
      accounts: [process.env.PRIVATE_KEY],
    },
    avalanche: {
      url: `https://avalanche-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    fuji: {
      url: `https://avalanche-fuji.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    fantom: {
      url: `https://rpc.ftm.tools`,
      accounts: [process.env.PRIVATE_KEY],
    },
    fantom_testnet: {
      url: `https://fantom-testnet.publicnode.com`,
      accounts: [process.env.PRIVATE_KEY],
    },
    celo: {
      url: `https://celo-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    celo_testnet: {
      url: `https://celo-alfajores.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    gnosis: {
      url: `https://gnosis.public-rpc.com`,
      accounts: [process.env.PRIVATE_KEY],
    },
    gnosis_testnet: {
      url: `https://rpc.chiadochain.net`,
      accounts: [process.env.PRIVATE_KEY],
    },
    core: {
      url: `https://rpc.coredao.org`,
      accounts: [process.env.PRIVATE_KEY],
    },
    core_testnet: {
      url: `https://rpc.test.btcs.network`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
      arbitrumGoerli: process.env.ARBISCAN_API_KEY,
      scroll_sepolia: process.env.SCROLLSCAN_API_KEY,
    },
    customChains: [
      {
        network: "scroll_sepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.dev",
        },
      },
    ],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    currency: "USD",
    token: "ETH",
    // gasPrice: 20, // in gwei
    gasPriceApi:
      "https://api.etherscan.io/api?module=gastracker&action=gasoracle",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: true,
    disambiguatePaths: false,
    strict: true,
    only: [],
    except: [],
  },
};
