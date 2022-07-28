// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721, ERC721URIStorage, Pausable, Ownable {
    uint256 public mintPrice; // mint price of each NFT
    uint256 public currentSupply; // current # minted
    uint256 public maxSupply; // max # that can be minted
    uint256 public maxPerWallet; // max # a wallet can mint
    address payable public withdrawWallet; // wallet that crypto is withdrawn to
    mapping(string => uint8) existingURIs; // maintains all minted NFTs

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("MyNFT", "MTK") {
        mintPrice = 0.02 ether;
        currentSupply = 0;
        maxSupply = 20;
        maxPerWallet = 5;
        // TO-DO: Set withdraw wallet
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }

    function count() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'Withdraw failed');
    }

    function payToMint(
        address recipient,
        string memory metadataURI
    ) public payable returns (uint256) {
        require(existingURIs[metadataURI] != 1, 'NFT already minted!');
        require(msg.value >= mintPrice, 'Need to pay up!');

        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        // Set mapping to 1 to prevent minting of existing token
        existingURIs[metadataURI] = 1;

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadataURI);

        return newItemId;
    }

    /**
    function batchMint(
        address recipient, 
        uint256 quantity_
    )public payable {
        require(msg.value == quantity_ * mintPrice, 'wrong mint value');
        require(currentSupply + quantity_ <= maxSupply, 'sold out');
        require(balanceOf(recipient) + quantity_ <= maxPerWallet, 'exceed max per wallet');

        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = currentSupply;
            currentSupply++;
            _mint(recipient, newTokenId);
            createURI(newTokenId);
        }
    }

    function createURI(uint256 newTokenId) private {
        string memory metadataURI = string(abi.encodePacked(newTokenId, ".json"));
        _setTokenURI(newTokenId, metadataURI);
    }
    */

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}