// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract MyNFT is ERC721, Ownable {
    uint256 public mintPrice; // min. mint price - set to 0 if NFT is award
    uint256 public currentSupply; // current # of minted NFTs
    uint256 public maxSupply; // total # of NFTs that can be minted
    uint256 public maxPerWallet; // # of NFTs that a wallet can mint
    bool public isPublicMintEnabled; // true - user can mint
    string internal baseTokenUri; // records NFT location
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('MyNFT', 'TKN') {
        mintPrice = 0.02 ether;
        currentSupply = 0;
        maxSupply = 100;
        maxPerWallet = 3;
        // set withdraw wallet address
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist!');
        return string(abi.encodePacked(baseTokenUri, String.toString(tokenId), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'withdraw failed');
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, 'minting not enabled');
        require(msg.value == quantitiy_ * mintPrice, 'wrong mint value');
        require(currentSupply + quantity_ <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceed max per wallet');

        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = currentSupply + 1;
            currentSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}