// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal{
    //totalWaves is a state variable => stored permanently in contract storage
    uint256 totalWaves;

    constructor() {
        console.log("Yo yo, I'm a contract and I am smart");
    }

    //we know who is msg.sender because in order to call a smart contract you 
    //need to be connected to a wallet
    function wave() public {
        totalWaves +=1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}