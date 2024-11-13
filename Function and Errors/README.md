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
pragma solidity 0.8.18;

contract MyContract {
    // Public variables for ticket system
    string public eventName = "METACRAFTER'S EXPO";
    string public ticketSymbol = "TICKET";
    uint public totalTickets = 0;
    
    // Mapping to store the ticket balances for each attendee
    mapping(address => uint) public ticketBalances;

    // Modifier to check if an attendee has any tickets
    modifier hasTickets(address _attendee) {
        require(ticketBalances[_attendee] > 0, "Attendee has no tickets.");
        _;
    }

    // Mint function to issue new tickets to attendees
    function issueTickets(address _attendee, uint _ticketAmount) public {
        require(_ticketAmount > 0, "Ticket amount must be greater than 0.");

        totalTickets += _ticketAmount;
        ticketBalances[_attendee] += _ticketAmount;

        // Using assert to verify total tickets is not zero after issuing tickets
        assert(totalTickets > 0); 
    }

    // Burn function for attendees to use or cancel tickets
    function useTickets(address _attendee, uint _ticketAmount) public hasTickets(_attendee) {
        require(_ticketAmount > 0, "Ticket amount must be greater than 0.");
        require(ticketBalances[_attendee] >= _ticketAmount, "Not enough tickets to use.");

        ticketBalances[_attendee] -= _ticketAmount;
        totalTickets -= _ticketAmount;

        // Assert to check no underflow occurred in total tickets
        assert(totalTickets >= 0);
    }

    // Function to check the ticket balance of a specific attendee
    function checkTicketBalance(address _attendee) public view returns (uint) {
        return ticketBalances[_attendee];
    }

    // Function to cancel all tickets if the event is postponed or canceled
    function cancelAllTickets() public {
        if (totalTickets == 0) {
            revert("No tickets to cancel.");
        }

        totalTickets = 0;
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
