# Smart Contract with `require()`, `assert()`, and `revert()`

This Solidity program is a simple demonstration of using the `require()`, `assert()`, and `revert()` statements in transactions using Solidity. The purpose of this program is to understand the control flow and error handling mechanisms provided in Solidity for a blockchain course assessment.

## Description

This program is a straightforward contract written in Solidity, a programming language used for developing smart contracts on the Ethereum blockchain. The contract demonstrates three key Solidity statements (`require()`, `assert()`, and `revert()`) to handle errors and ensure conditions. This contract provides functions to deposit, withdraw, and reset a balance while verifying conditions for each action. The project serves as an introduction to Solidity's error-handling techniques.

## Getting Started

### Executing the Program

To run this smart contract, you can use [Remix](https://remix.ethereum.org), an online IDE for Solidity.

1. **Create a New File in Remix**  
   Once on the Remix website, click the "+" icon in the left-hand sidebar to create a new file. Name it `SimpleSmartContract.sol` (or any name ending in `.sol`).

2. **Paste the Code**  
   Copy and paste the code below into the file:

   ```solidity
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   contract SimpleSmartContract {
       uint256 public balance;
       address public owner;

       constructor() {
           owner = msg.sender;
       }

       function deposit(uint256 amount) public {
           require(amount > 0, "Amount must be greater than zero");
           balance += amount;
       }

       function withdraw(uint256 amount) public {
           require(msg.sender == owner, "Only the owner can withdraw");
           require(amount <= balance, "Insufficient balance");
           balance -= amount;
           assert(balance >= 0);
       }

       function resetBalance() public {
           if (msg.sender != owner) {
               revert("Only the owner can reset the balance");
           }
           balance = 0;
       }
   }


3. **Compile the Code**  
   In the Remix IDE, select the "Solidity Compiler" tab from the sidebar on the left. Ensure the compiler version is set to 0.8.0 or higher, then click "Compile SimpleSmartContract.sol".

4. **Deploy the Contract**  
   Once compiled, go to the "Deploy & Run Transactions" tab, select the "SimpleSmartContract" contract, and press "Deploy."

5. **Interacting with the Contract**  
   - To test `deposit`, enter an amount and click the `deposit()` function.  
   - For `withdraw`, enter an amount to withdraw and click the `withdraw()` function.  
   - To test `resetBalance()`, ensure you're using a non-owner address to see the `revert()` statement in action.


Authors
Jethro Emmanuel C. Roxas | 202110139@fit.edu.ph

License
This project is licensed under the MIT License.
