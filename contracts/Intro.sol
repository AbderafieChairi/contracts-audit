//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract Intro {
    string name = "John Doe";
    address private owner;


    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call me");
        _;
    }

    function setName(string memory _name) public onlyOwner {
        name = _name;
    }
    function getName() public view returns (string memory) {
        return name;
    }


    function resetName() internal {
        name = "Jane Doe";
    }
}