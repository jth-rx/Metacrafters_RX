# Create a Token Assessment 

This Solidity program is a simple program that demonstrates how does basic Minting and Destroying the token works in the transactions using Solidity Programming. The purpose of this program is for an assesment on the Metacrafters Webcourse.


## Description

This program is a simple contract written in Solidity, a programming language used for developing smart contracts on the Ethereum blockchain. The contract has 2 (two) function that mints a token/s & destroys a token/s. This program serves as a simple and straightforward introduction to Solidity programming, and can be used as a stepping stone for more complex projects in the future.

## Getting Started

### Executing program

Remix is an online Solidity IDE that may be used to run this software; to get started, visit the Remix website at https://remix.ethereum.org.

Click the "+" symbol in the left-hand sidebar to start a new file once you are on the Remix website. Save the file as myFileName.sol or another file with the.sol extension. The code below should be copied and pasted into the file:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract myToken {

    // public variables here
    string public tokenName = "Jethro";
    string public tokenAbbrv = "JTHR";
    uint public totalSupply = 0;

    // mapping variable here
    mapping(address => uint) public balances;

    // mint function
   function Mint(address _address, uint _value) public {
      totalSupply += _value;
      balances[_address] += _value;
   }
    // burn function
    function Burn(address _address, uint _value) public {
      if(balances[_address] >= _value){
         totalSupply -= _value;
         balances[_address] -= _value;
      }
      
    }
}
```

Select the "Solidity Compiler" tab from the sidebar on the left to begin compiling the code. Click "Compile myFileName.sol" after ensuring that the "Compiler" option is set to "0.8.18" (or another suitable version).

Selecting the "Deploy & Run Transactions" tab from the left-hand sidebar will allow you to deploy the contract after the code has been compiled. From the dropdown menu, choose the "myToken" contract, and then press the "Deploy" button.

When the contract is deployed, you can communicate with it by invoking the Burn or Mint Function and providing the necessary parameters. Lastly, to use the function you have interacted with, click the "transact" button.


## Authors

Jethro Emmanuel C. Roxas | 
202110139@fit.edu.ph

## License

This project is licensed under the MIT License
