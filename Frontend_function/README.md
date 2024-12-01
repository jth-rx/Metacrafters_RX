# Assessment Smart Contract

## Overview

The Assessment smart contract is a Solidity-based decentralized application (dApp) that manages community donations with controlled fund withdrawal mechanisms. It allows users to donate funds and provides the contract owner with the ability to withdraw donations once a specified threshold is met.

## Features

- **Donation Functionality**
  - Users can donate any amount of cryptocurrency
  - Tracks total donations and individual donor contributions
  - Emits events for each donation received

- **Controlled Withdrawal**
  - Only the contract owner can withdraw funds
  - Withdrawal is only possible after a predefined donation threshold is reached
  - Automatically resets total donations after withdrawal

- **Threshold Management**
  - Owner can update the withdrawal threshold dynamically
  - Ensures flexibility in fund collection strategy

## Contract Functions

### `donate()`
- Allows users to contribute funds to the contract
- Requires donation amount to be greater than zero
- Updates individual and total donation tracking
- Emits a `DonationReceived` event

### `withdrawFunds()`
- Exclusive to contract owner
- Withdraws entire contract balance
- Requires total donations to meet or exceed threshold
- Resets total donations to zero after withdrawal
- Emits a `FundsWithdrawn` event

### `updateThreshold(uint256 _newThreshold)`
- Allows owner to modify the withdrawal threshold
- Requires new threshold to be greater than zero
- Emits a `ThresholdUpdated` event

### View Functions
- `getTotalDonations()`: Returns current total donations
- `getDonationOf(address _donor)`: Retrieves donation amount for a specific address

## Security Considerations
- Uses `require()` statements for access control and validation
- Implements `assert()` for critical state checks
- Follows best practices for fund management in Solidity

## Development Environment
- Solidity Version: ^0.8.9
- License: UNLICENSED

## Author
Jethro Emmanuel C. Roxas
