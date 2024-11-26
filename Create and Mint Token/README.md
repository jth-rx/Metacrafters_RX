# Jethcoin (JTC) - ERC20 Token Contract

Jethcoin (JTC) is a custom ERC20 token built with Solidity, allowing users to mint, burn, and transfer tokens. The contract also includes owner privileges for minting new tokens.

## Features

- **ERC20 Token**: Implements the ERC20 standard for fungible tokens.
- **Minting**: Only the contract owner can mint (create) new tokens.
- **Burning**: Users can burn (destroy) their own tokens to reduce the total supply.
- **Transfer**: Allows token transfers between accounts with basic checks.

## Contract Overview

The contract inherits from OpenZeppelin's `ERC20` and `Ownable` contracts, making it easy to manage tokens and ownership.

### Functions

1. **mint(address to, uint256 amount)**: Allows the owner to mint new tokens and send them to the specified address.
2. **burn(uint256 amount)**: Allows a user to burn their own tokens, reducing the total supply.
3. **transferTokens(address receiver, uint256 amount)**: Allows a user to transfer tokens to another account (requires approval and uses `transferFrom`).

## Installation

### Prerequisites

To work with this contract, you need to have the following:

- **Remix IDE** (browser-based Solidity IDE).
- **MetaMask** or another Ethereum wallet connected to Remix.

### Setting Up the Contract in Remix

1. **Access Remix IDE**:
   Open your browser and navigate to [Remix IDE](https://remix.ethereum.org/).

2. **Create a New Solidity File**:
   - In the Remix IDE, click on the **File Explorer** panel on the left.
   - Click the **New File** button and name the file `Jethcoin.sol`.
   - Copy and paste the entire Solidity code provided into the new file.

3. **Install OpenZeppelin Contracts**:
   OpenZeppelin's contracts are already imported in the code, so Remix will automatically fetch them. However, if Remix doesn't automatically fetch them, you can install them manually using Remix's **Solidity Compiler** plugin. Make sure to use the correct version (e.g., `0.8.x`) of the OpenZeppelin contracts.

4. **Compile the Contract**:
   - Go to the **Solidity Compiler** tab (on the left sidebar).
   - Make sure the Solidity version matches `^0.8.23`.
   - Click the **Compile** button to compile the contract.

5. **Deploy the Contract**:
   - Go to the **Deploy & Run Transactions** tab.
   - Choose **Injected Web3** for the environment, which will connect Remix to your MetaMask wallet.
   - Select the `Jethcoin` contract from the "Contract" dropdown.
   - Make sure your MetaMask wallet is connected to the desired network (e.g., Ethereum mainnet, Rinkeby testnet).
   - Click **Deploy**.
   - Confirm the transaction in MetaMask.

6. **Interact with the Contract**:
   Once deployed, you'll see the contract’s deployed instance under **Deployed Contracts** in Remix. You can interact with the contract by calling functions like `mint`, `burn`, and `transferTokens`.

---

## Contract Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Jethcoin is ERC20, Ownable {
    // Constructor
    constructor() ERC20("JETHCOIN", "JTC") Ownable(msg.sender) {}

    // Mint new coins
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Burn coins
    function burn(uint256 amount) public {
        require(amount > 0, "Transfer amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Not enough coins to burn"); 
        _burn(msg.sender, amount);
    }

    // Transfer coins
    function transferTokens(address receiver, uint256 amount) external {
        require(amount > 0, "Transfer amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Not enough coins to transfer"); 
        approve(msg.sender, amount);
        transferFrom(msg.sender, receiver, amount);
    }
}
```
## Example Addresses

## Initial Account: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
## Transfer to: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2

These are example Ethereum addresses for testing transfers. Replace them with your actual Ethereum addresses when using the contract.
