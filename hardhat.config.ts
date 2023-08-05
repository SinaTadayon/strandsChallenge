import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";
import "solidity-coverage";

dotenv.config();

const mnemonic = process.env.MNEMONIC;
const systemAdminKey = process.env.SYSTEM_ADMIN_KEY;

const netAccounts = systemAdminKey ? [systemAdminKey] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    hardhat: mnemonic ? { accounts: { mnemonic } } : {},
    localhost: {
      url: "http://127.0.0.1:8545",
      // accounts: netAccounts,
    },
    linea: {
      url: "https://rpc.goerli.linea.build",
      chainId: 59140,
      accounts: netAccounts,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },

  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
    only: [],
  },

  abiExporter: {
    path: "./export/abi",
    runOnCompile: false,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: false,
  },

  typechain: {
    outDir: "./typechain/types",
    target: "ethers-v6",
    alwaysGenerateOverloads: true, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ["externalArtifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
};

export default config;
