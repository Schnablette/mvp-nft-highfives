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

    const NftHighFives = await ethers.getContractFactory("NftHighFives");
    nftHighFives = await NftHighFives.deploy();

    await nftHighFives.deployed();
  });

  describe("Deployments", function () {
    it("Should deploy the High Five contract to the network", async function () {
      await expect(nftHighFives.address).to.exist;
    });
    it("Should deploy the NFT contract to the network", async function () {
      await expect(nft.address).to.exist;
    });
  });

  describe("Initiation", function () {
    this.beforeEach(async function () {
      await nftHighFives.initiateHighFive(nft.address, 0, addr1.address);
    });

    it("Should change interactionPending to true", async function () {
      expect(await nftHighFives.readData(nft.address, 0, addr1.address)).to.eql(
        [false, true]
      );
    });

    it("Should not allow someone to initiate if pending is already true", async function () {
      await expect(
        nftHighFives.initiateHighFive(nft.address, 0, addr1.address)
      ).to.be.revertedWith("Already initiated");
    });

    it("Should not allow someone who doesn't own the nft to initiate a high five", async function () {
      await expect(
        nftHighFives
          .connect(addr1)
          .initiateHighFive(nft.address, 0, deployer.address)
      ).to.be.revertedWith("NFT not owned by sender");
    });

    it("Should not allow someone to initiate if already verified", async function () {
      await nftHighFives.connect(addr1).receiveHighFive(nft.address, 0);
      await expect(
        nftHighFives.initiateHighFive(nft.address, 0, addr1.address)
      ).to.be.revertedWith("Already verified");
    });
  });

  describe("Reception", async function () {
    it("Should change verified to true and pending to false", async function () {
      await nftHighFives.initiateHighFive(nft.address, 0, addr1.address);
      await nftHighFives.connect(addr1).receiveHighFive(nft.address, 0);
      expect(await nftHighFives.readData(nft.address, 0, addr1.address)).to.eql(
        [true, false]
      );
    });

    it("Should not allow someone to receive if already verified", async function () {
      await nftHighFives.initiateHighFive(nft.address, 0, addr1.address);
      await nftHighFives.connect(addr1).receiveHighFive(nft.address, 0);
      await expect(
        nftHighFives.connect(addr1).receiveHighFive(nft.address, 0)
      ).to.be.rejectedWith("Already verified");
    });

    it("Should not allow someone to receive if not pending", async function () {
      await expect(
        nftHighFives.connect(addr1).receiveHighFive(nft.address, 0)
      ).to.be.rejectedWith("No request pending");
    });
  });

  describe("Rejection", async function () {
    it("Should change pending to false and keep verified false", async function () {
      await nftHighFives.initiateHighFive(nft.address, 0, addr1.address);
      await nftHighFives.connect(addr1).rejectHighFive(nft.address, 0);
      expect(await nftHighFives.readData(nft.address, 0, addr1.address)).to.eql(
        [false, false]
      );
    });

    it("Should not allow someone to reject if already verified", async function () {
      await nftHighFives.initiateHighFive(nft.address, 0, addr1.address);
      await nftHighFives.connect(addr1).receiveHighFive(nft.address, 0);
      await expect(
        nftHighFives.connect(addr1).rejectHighFive(nft.address, 0)
      ).to.be.rejectedWith("Already verified");
    });

    it("Should not allow someone to reject if not pending", async function () {
      await expect(
        nftHighFives.connect(addr1).rejectHighFive(nft.address, 0)
      ).to.be.rejectedWith("No request pending");
    });
  });

  describe("Events", function () {
    it("Should emit an event after high five initiated", async function () {
      expect(await nftHighFives.initiateHighFive(nft.address, 0, addr1.address))
        .to.emit(nftHighFives, "InteractionInitiated")
        .withArgs(nft.address, 0, addr1.address);
    });

    it("Should emit an event after high five received", async function () {
      await nftHighFives.initiateHighFive(nft.address, 0, addr1.address);
      expect(await nftHighFives.connect(addr1).receiveHighFive(nft.address, 0))
        .to.emit(nftHighFives, "InteractionReceived")
        .withArgs(nft.address, 0, addr1.address);
    });

    it("Should emit an event after high five rejected", async function () {
      await nftHighFives.initiateHighFive(nft.address, 0, addr1.address);
      expect(await nftHighFives.connect(addr1).rejectHighFive(nft.address, 0))
        .to.emit(nftHighFives, "InteractionRejected")
        .withArgs(nft.address, 0, addr1.address);
    });
  });
});
