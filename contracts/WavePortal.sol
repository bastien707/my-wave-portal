// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal{
    //totalWaves is a state variable => stored permanently in contract storage
    uint256 totalWaves;

    event NewWave(
        address indexed from, 
        uint256 timestamp, 
        string message
    );

    struct Wave{
        address waver;
        string message;
        uint timestamp;
    }

    // array of Wave structure
    Wave[] waves;

    constructor() {
        console.log("I'm a smart contract");
    }

    //we know who is msg.sender because in order to call a smart contract you 
    //need to be connected to a wallet
    //require _message which is the message our user sends us from the frontend
    function wave(string memory _message) public {
        totalWaves +=1;
        console.log("%s waved! w/ message %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory){
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}