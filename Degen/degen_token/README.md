# DegenToken Smart Contract

## Overview
The `DegenToken` smart contract is a decentralized token system built using Solidity. It includes features for minting, transferring, burning tokens, and redeeming token-based battlepasses. The contract utilizes the ERC-20 token standard and extends the `Ownable` contract from OpenZeppelin for access control.

## Features
- **ERC-20 Token**: The contract implements an ERC-20 token with the name "Degen" and the symbol "DGN".
- **Battlepass System**: Users can redeem tokens for a variety of battlepass upgrades, which provide different benefits.
- **Minting**: The contract owner can mint new tokens to any address.
- **Transferring Tokens**: Users can transfer tokens to others within the system.
- **Burning Tokens**: Users can burn their tokens to reduce their balance.
- **Redeeming Battlepasses**: Users can redeem tokens to acquire different battlepass upgrades, which are stored in a mapping for each address.

## Contract Structure

### `battlePass` Struct
The `battlePass` struct represents a battlepass upgrade with the following properties:
- `id`: Unique identifier for the battlepass.
- `title`: Title of the battlepass.
- `description`: Description of the benefits of the battlepass.
- `cost`: The cost (in tokens) to redeem the battlepass.

### `battlePasses` Array
A list of available battlepass upgrades, initialized in the constructor.

### `redeemedBattlepass` Mapping
A mapping that keeps track of which battlepasses have been redeemed by each user.

## Functions

### 1. `constructor()`
Initializes the ERC-20 token with the name "Degen" and symbol "DGN", and sets up some default battlepass upgrades:
- **Bronze Pass**: Costs 5 tokens.
- **Silver Pass**: Costs 10 tokens.
- **Gold Pass**: Costs 15 tokens.

### 2. `mint(address to, uint256 amount)`
Mints new tokens and sends them to the specified address. Only the contract owner can call this function.

### 3. `transferTokens(address to, uint256 amount)`
Transfers a specified amount of tokens to another address. The sender must have sufficient balance.

### 4. `getRedeemedBattlepass(address account)`
Returns an array of redeemed battlepass IDs for a given user.

### 5. `storeRedeemedBattlepass(address user, uint256 itemId)`
Stores the redeemed battlepass ID for a user. This function is used internally by the contract when a user redeems a battlepass.

### 6. `redeemBattlepass(uint256 upgradeId)`
Allows a user to redeem a battlepass upgrade by burning tokens. The user must have sufficient tokens to redeem the selected battlepass.

### 7. `checkTokenBalance(address account)`
Returns the token balance of a specified account.

### 8. `burnTokens(uint256 amount)`
Allows the user to burn a specified amount of tokens, reducing their balance.

## Requirements
- Solidity ^0.8.18
- OpenZeppelin Contracts:
  - ERC20
  - Ownable

## Deployment
To deploy this contract, follow these steps:

1. Install dependencies using npm:
   ```bash
   npm install @openzeppelin/contracts


## Author
Jethro Emmanuel C. Roxas
202110139
