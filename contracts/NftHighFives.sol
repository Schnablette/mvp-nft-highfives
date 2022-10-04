// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftHighFives is Ownable {
    struct Data {
        bool highFived;
        bool interactionPending;
    }

    mapping(IERC721 => mapping(address => Data)) public NFTs;

    // event highFiveInitiated(address indexed _partner);

    constructor() {}

    function initiateHighFive(IERC721 _token) external {
        require(!NFTs[_token][msg.sender].highFived);
        // require(ownerOf(_token))
        NFTs[_token][msg.sender].interactionPending = true;
    }

    function receiveHighFive(address _partner, bool _decision)
        external
        onlyOwner
    {}
}
