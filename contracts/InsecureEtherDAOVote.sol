//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract InsecureEtherDAOVote{
    mapping (address => uint256) private userBalances;
    uint256 public immutable voteDeadline;


    struct UserVote {
        uint256 candidateID;
        uint256 voteAmount;
        bool completed;
    }

    mapping (address => UserVote) private userVotes;

    struct CEOCandidate {
        string name;
        uint256 totalVoteAmount;
    }

    CEOCandidate[] private candidates;

    constructor(uint256 _voteDeadline){
        voteDeadline = _voteDeadline;

        candidates.push(
            CEOCandidate({name: "Amine", totalVoteAmount: 0})     
        );

        candidates.push(
            CEOCandidate({name: "Abderafie", totalVoteAmount: 0})     
        );

        candidates.push(
            CEOCandidate({name: "Driss", totalVoteAmount: 0})     
        );
    }




    function vote(uint256 _candidateID, uint256 voteAmount) external {
        require(block.timestamp < voteDeadline,"Vote is done");
        require(!userVotes[msg.sender].completed,"You have already voted");
        require(_candidateID < candidates.length, "Invalid candidate id");
        require(voteAmount > 0,"Vote amount must be greater than 0");

        
        uint256 userBalance = getUserBalance(msg.sender);
        require(userBalance >= voteAmount, "Insufficient balance to vote");

        userVotes[msg.sender] = UserVote({
            candidateID: _candidateID,
            voteAmount: voteAmount,
            completed: true
        });

        candidates[_candidateID].totalVoteAmount += voteAmount;
    }

    function getUserBalance(address _user) internal view returns(uint256){
        return userBalances[_user];
    }

    function getTotalCandidates() external view returns(uint256){
        return candidates.length;        
    }

    function getUserVote(address _user) external view returns(UserVote memory){
        return userVotes[_user];
    }

    function getCandidate(uint256 _candidateID) external view returns(CEOCandidate memory){
        require(_candidateID < candidates.length, "Invalid candidat id");
        return candidates[_candidateID];
    }

}