const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function() {
    it("Should mint and transfer an NFT to someone", async function () {
        const MyNFT = await ethers.getContractFactory("MyNFT");
        const mynft = await MyNFT.deploy();
        await mynft.deployed();

        const recipient = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
        const metadataURI = 'cid/test.png'

        let balance = await mynft.balanceOf(recipient);
        expect(balance).to.equal(0);

        const newlyMintedToken = await mynft.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.06')});

        // Wait for transaction to be mined
        await newlyMintedToken.wait();

        balance = await mynft.balanceOf(recipient);
        expect(balance).to.equal(1);

        expect(await mynft.isContentOwned(metadataURI)).to.equal(true);
    });
});