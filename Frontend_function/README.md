# Assessment Contract

This project contains a Solidity smart contract called **Assessment** that manages deposits and withdrawals of ETH. The owner of the contract can perform the following actions:

- Deposit ETH into the contract.
- Withdraw a specific amount of ETH.
- Withdraw all ETH from the contract.
- Logout to the website.

The project also includes a front-end application to interact with the smart contract using MetaMask.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MetaMask](https://metamask.io/) extension installed in your browser

## Getting Started

After cloning the GitHub repository, follow these steps to set up and run the project:

### 1. Install Dependencies

Navigate to the project directory in your terminal and run:

```bash
npm install
```

This will install all the necessary dependencies required for the project.

### 2. Start a Local Blockchain

Open a second terminal in your project directory and start a local blockchain using Hardhat:

```bash
npx hardhat node
```

### 3. Deploy the Smart Contract

Open a third terminal in your project directory and deploy the contract to the local blockchain:

```bash
npx hardhat run --network localhost scripts/deploy.js
```

### 4. Launch the Front-End

Return to the first terminal and run:

```bash
npm run dev
```

This will start the development server, and the front-end application will be available at:

```
http://localhost:3000/
```

## Features

### Contract Functions

1. **`getBalance`**
   - Returns the current balance of the contract.

2. **`deposit`**
   - Allows the owner to deposit a specific amount of ETH into the contract.

3. **`withdraw`**
   - Allows the owner to withdraw a specific amount of ETH from the contract.

4. **`withdrawAll`**
   - Allows the owner to withdraw all ETH from the contract.
  
5. **`Logout`**
   - Allows the owner to logout to the website.

### Front-End Interaction

- Connect your MetaMask wallet to interact with the contract.
- Perform deposit and withdrawal actions through the web interface.

## Notes

- Make sure MetaMask is connected to the same local blockchain (Hardhat) network.
- Use the account provided by Hardhat when interacting with the contract as the owner.

## License

This project is licensed under the [UNLICENSED](https://choosealicense.com/licenses/unlicense/) license.
