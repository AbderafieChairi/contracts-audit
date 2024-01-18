//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract VotingSystem {

    // Owner of the contract (election organizer)
    address public owner;

    // Enum to represent the status of the voting process
    enum VotingStatus { Registration, Voting, Ended }

    // Struct to represent a candidate
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    // Array of candidates
    Candidate[] public candidates;

    // Mapping of addresses to indicate whether a voter has already voted
    mapping(address => bool) public hasVoted;

    // Mapping of candidate names to their respective indices
    mapping(string => uint256) public candidateIndices;

    // Current status of the voting process
    VotingStatus public votingStatus;

    // Event to emit when a vote is cast
    event VoteCast(address indexed voter, string candidateName);

    // Modifier to ensure that only the owner can execute certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Constructor to initialize the contract
    constructor() {
        owner = msg.sender;
        votingStatus = VotingStatus.Registration;
    }

    // Function to register a candidate
    function registerCandidate(string memory _name) public onlyOwner {
        require(votingStatus == VotingStatus.Registration, "Cannot register candidates after voting has started");
        
        candidates.push(Candidate({
            name: _name,
            voteCount: 0
        }));
        
        candidateIndices[_name] = candidates.length - 1;
    }

    // Function to start the voting process
    function startVoting() public onlyOwner {
        require(votingStatus == VotingStatus.Registration, "Voting has already started");
        votingStatus = VotingStatus.Voting;
    }

    // Function to cast a vote
    function castVote(string memory _candidateName) public {
        require(votingStatus == VotingStatus.Voting, "Voting is not currently open");
        require(candidateIndices[_candidateName] > 0, "Invalid candidate");

        require(!hasVoted[msg.sender], "You have already voted");
        
        candidates[candidateIndices[_candidateName]].voteCount++;
        hasVoted[msg.sender] = true;
        
        emit VoteCast(msg.sender, _candidateName);
    }

    // Function to end the voting process and retrieve results
    function endVoting() public onlyOwner {
        require(votingStatus == VotingStatus.Voting, "Voting has not started");
        votingStatus = VotingStatus.Ended;
    }

    // Function to get the total number of candidates
    function getCandidateCount() public view returns (uint256) {
        return candidates.length;
    }

    // Function to get the details of a specific candidate
    function getCandidateDetails(uint256 _index) public view returns (string memory, uint256) {
        require(_index < candidates.length, "Invalid candidate index");
        return (candidates[_index].name, candidates[_index].voteCount);
    }

    // Function to check if the sender has already voted
    function hasVoterVoted() public view returns (bool) {
        return hasVoted[msg.sender];
    }
}
