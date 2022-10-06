// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/// @title NFT High Fives
/// @author Ann Schnabel
contract NftHighFives {
    struct Data {
        bool verified;
        bool interactionPending;
    }

    /// @dev mapping(tokenAddress => mapping(tokenId => mapping(receiver => Data)))
    mapping(IERC721 => mapping(uint256 => mapping(address => Data)))
        public NFTs;

    event interactionInitiated(
        IERC721 indexed _token,
        uint256 indexed _tokenId,
        address indexed _partner
    );

    event interactionReceived(
        IERC721 indexed _token,
        uint256 indexed _tokenId,
        address indexed _receiver
    );

    event interactionRejected(
        IERC721 indexed _token,
        uint256 indexed _tokenId,
        address indexed _receiver
    );

    constructor() {}

    function initiateHighFive(
        IERC721 _token,
        uint256 _tokenId,
        address _receiver
    ) external {
        require(!NFTs[_token][_tokenId][_receiver].verified);
        require(_token.ownerOf(_tokenId) == msg.sender);
        NFTs[_token][_tokenId][_receiver].interactionPending = true;

        emit interactionReceived(_token, _tokenId, _receiver);
    }

    function receiveHighFive(IERC721 _token, uint256 _tokenId) external {
        require(!NFTs[_token][_tokenId][msg.sender].verified);
        require(NFTs[_token][_tokenId][msg.sender].interactionPending == true);
        NFTs[_token][_tokenId][msg.sender].verified = true;

        emit interactionReceived(_token, _tokenId, msg.sender);
    }

    function rejectHighFive(IERC721 _token, uint256 _tokenId) external {
        require(!NFTs[_token][_tokenId][msg.sender].verified);
        require(NFTs[_token][_tokenId][msg.sender].interactionPending == true);
        NFTs[_token][_tokenId][msg.sender].interactionPending = false;

        emit interactionRejected(_token, _tokenId, msg.sender);
    }
}
