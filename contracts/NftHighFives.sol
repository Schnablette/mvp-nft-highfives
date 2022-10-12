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
        public nfts;

    event InteractionInitiated(
        IERC721 indexed _token,
        uint256 indexed _tokenId,
        address indexed _receiver
    );

    event InteractionReceived(
        IERC721 indexed _token,
        uint256 indexed _tokenId,
        address indexed _receiver
    );

    event InteractionRejected(
        IERC721 indexed _token,
        uint256 indexed _tokenId,
        address indexed _receiver
    );

    function initiateHighFive(
        IERC721 _token,
        uint256 _tokenId,
        address _receiver
    ) external {
        require(
            !nfts[_token][_tokenId][_receiver].verified,
            "Already verified"
        );
        require(
            _token.ownerOf(_tokenId) == msg.sender,
            "NFT not owned by sender"
        );
        require(
            !nfts[_token][_tokenId][_receiver].interactionPending,
            "Already initiated"
        );
        nfts[_token][_tokenId][_receiver].interactionPending = true;

        emit InteractionInitiated(_token, _tokenId, _receiver);
    }

    function receiveHighFive(IERC721 _token, uint256 _tokenId) external {
        require(
            !nfts[_token][_tokenId][msg.sender].verified,
            "Already verified"
        );
        require(
            nfts[_token][_tokenId][msg.sender].interactionPending == true,
            "No request pending"
        );
        nfts[_token][_tokenId][msg.sender].verified = true;
        nfts[_token][_tokenId][msg.sender].interactionPending = false;

        emit InteractionReceived(_token, _tokenId, msg.sender);
    }

    function rejectHighFive(IERC721 _token, uint256 _tokenId) external {
        require(
            !nfts[_token][_tokenId][msg.sender].verified,
            "Already verified"
        );
        require(
            nfts[_token][_tokenId][msg.sender].interactionPending == true,
            "No request pending"
        );
        nfts[_token][_tokenId][msg.sender].interactionPending = false;

        emit InteractionRejected(_token, _tokenId, msg.sender);
    }

    function readData(
        IERC721 _token,
        uint256 _tokenId,
        address _receiver
    ) public view returns (bool, bool) {
        return (
            nfts[_token][_tokenId][_receiver].verified,
            nfts[_token][_tokenId][_receiver].interactionPending
        );
    }

    fallback() external {
        return;
    }
}
