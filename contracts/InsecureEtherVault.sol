//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract InsecureEtherVault {
    mapping (address => uint256) private userBalances;

    address private sender;

    function deposit() external payable {
    
        userBalances[msg.sender] += msg.value;
        sender = msg.sender;
    }

    function getSender() external view returns (address) {
        return sender;
    }
    event WithdrawAllEvent(address user, uint256 amount);

    function withdrawAll() external {
        uint256 balance = getUserBalance(msg.sender);
        require(balance > 0, "Insufficient balance");
        emit WithdrawAllEvent(msg.sender, balance);
        (bool success, ) = msg.sender.call{value: balance, gas: 100000}("");
        require(success, "Failed to send Ether");

        userBalances[msg.sender] = 0;
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getUserBalance(address _user) public view returns (uint256) {
        return userBalances[_user];
    }

}