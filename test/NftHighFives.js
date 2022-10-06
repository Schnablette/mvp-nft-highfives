const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT High Five Contract", function () {
  let nftHighFives;
  let nft;

  let deployer;
  let addr1;

  this.beforeEach(async function () {
    [deployer, addr1] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();

    const NftHighFives = await hre.ethers.getContractFactory("NftHighFives");
    nftHighFives = await NftHighFives.deploy();

    await nftHighFives.deployed();
  });

  describe("Deployments", function () {
    it("Should deploy the High Five contract to the network", async function () {
      expect(nftHighFives.address).to.exist;
    });
    it("Should deploy the NFT contract to the network", async function () {
      expect(nft.address).to.exist;
    });
  });

  this.beforeEach(async function () {
    await nftHighFives.initiateHighFive(nft.address, 0, addr1.address);
  });

  describe("Initiation", function () {
    it("Should change interactionPending to true", async function () {
      await expect(
        nftHighFives.nfts(nft, 0, deployer.address, "interactionPending")
      ).to.equal(true);
    });
  });
});
