// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title MyNFT ERC721 Ownable
/// @author Ann Schnabel
/// @notice Only mints a single NFT to owner
contract NFT is ERC721, Ownable {
    constructor() ERC721("MyNFT", "NFT") {
        _safeMint(owner(), 0);
    }
}