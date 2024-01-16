//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Counter {
uint256 currentCount = 0;

    function increment() public {
        currentCount = currentCount + 1;
    }

    function retrieve() public view returns (uint256){
        return currentCount;
    }
}


contract CounterCaller {
    Counter private counterContract;

    constructor(address _counterAddress) {
        counterContract = Counter(_counterAddress);
    }

    function callRetrieve() public view returns (uint256) {
        return counterContract.retrieve();
    }
}