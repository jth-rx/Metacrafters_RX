// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract myContract {
    uint256 public balance;
    address public owner;

    constructor() {
        owner = msg.sender; // Set the owner to the address deploying the contract
    }

    // Function to deposit funds with a require() check
    function deposit(uint256 amount) public {
        require(amount > 0, "Amount must be greater than zero");
        balance += amount;
    }

    // Function to withdraw funds with require() and assert()
    function withdraw(uint256 amount) public {
        require(msg.sender == owner, "Only the owner can withdraw");
        require(amount <= balance, "Insufficient balance");

        balance -= amount;
        assert(balance >= 0); // Ensure balance doesn't go negative
    }

    // Function to reset balance with a revert example
    function resetBalance() public {
        if (msg.sender != owner) {
            revert("Only the owner can reset the balance");
        }
        balance = 0;
    }
}
