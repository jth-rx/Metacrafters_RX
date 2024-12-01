// // SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public totalDonations;
    uint256 public withdrawalThreshold;
    mapping(address => uint256) public donations;

    event DonationReceived(address indexed donor, uint256 amount);
    event FundsWithdrawn(address indexed owner, uint256 amount);
    event ThresholdUpdated(uint256 newThreshold);

    constructor(uint256 _initialThreshold) payable {
        owner = payable(msg.sender);
        withdrawalThreshold = _initialThreshold;
        totalDonations = 0;
    }

    // Function to make a donation to the community fund
    function donate() public payable {
        require(msg.value > 0, "Donation amount must be greater than zero");

        uint256 previousBalance = totalDonations;
        donations[msg.sender] += msg.value;
        totalDonations += msg.value;

        // Assert ensures the total balance is updated correctly
        assert(totalDonations == previousBalance + msg.value);

        emit DonationReceived(msg.sender, msg.value);
    }

    // Owner can withdraw funds only if the threshold is met
    function withdrawFunds() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        require(totalDonations >= withdrawalThreshold, "Threshold not reached");

        uint256 previousBalance = totalDonations;
        uint256 amountToWithdraw = totalDonations;
        totalDonations = 0;

        (bool success, ) = owner.call{value: amountToWithdraw}("");
        require(success, "Withdrawal failed");

        // Assert ensures the balance is zero after withdrawal
        assert(totalDonations == 0);

        emit FundsWithdrawn(msg.sender, previousBalance);
    }

    // Function to update the withdrawal threshold (only by the owner)
    function updateThreshold(uint256 _newThreshold) public {
        require(msg.sender == owner, "Only the owner can update the threshold");
        require(_newThreshold > 0, "Threshold must be greater than zero");

        withdrawalThreshold = _newThreshold;

        emit ThresholdUpdated(_newThreshold);
    }

    // Function to get the current total donations
    function getTotalDonations() public view returns (uint256) {
        return totalDonations;
    }

    // Function to get the donation amount of a specific donor
    function getDonationOf(address _donor) public view returns (uint256) {
        return donations[_donor];
    }
}
