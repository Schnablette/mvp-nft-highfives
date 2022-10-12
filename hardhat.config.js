require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-chai-matchers");
require("hardhat-docgen");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};
