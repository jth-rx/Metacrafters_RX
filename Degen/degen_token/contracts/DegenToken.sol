// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable {
    // Structure to represent a Prestige Upgrade
    struct battlePass {
        uint256 id;
        string title;
        string description;
        uint256 cost;
    }

    
    battlePass[] public battlePasses; // List of prestige upgrades
    mapping(address => uint256[]) public redeemedBattlepass; // list of battlepasses

    // Constructor
    constructor() ERC20("Degen", "DGN") Ownable(msg.sender) {
        // Initialize some battlepass upgrades
        battlePasses.push(battlePass(1, "Bronze Pass", "Entry-level Battlepass for new users", 5));
        battlePasses.push(battlePass(2, "Silver Pass", "Intermediate Battlepass with additional perks", 10));
        battlePasses.push(battlePass(3, "Gold Pass", "High-level Battlepass with exclusive rewards", 15));
    }

    // Mint new tokens to another address
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Transfer tokens to another address
    function transferTokens(address to, uint256 amount) public {
        require(amount > 0, "Transfer amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _transfer(msg.sender, to, amount);
    }

    function getRedeemedBattlepass(address account) public view returns (uint256[] memory) {
        return redeemedBattlepass[account];
    }

    function storeRedeemedBattlepass(address user, uint256 itemId) internal {
        redeemedBattlepass[user].push(itemId);
    }

    // Redeem tokens for battlepass upgrades
    function redeemBattlepass(uint256 upgradeId) public {
        require(upgradeId < battlePasses.length, "Invalid upgrade ID");

        battlePass storage upgrade = battlePasses[upgradeId];
        require(balanceOf(msg.sender) >= upgrade.cost, "Insufficient balance");

        _burn(msg.sender, upgrade.cost);
        storeRedeemedBattlepass(msg.sender, upgradeId);
    }

    // Check token balance of an address
    function checkTokenBalance(address account) public view returns (uint256) {
        return balanceOf(account);
    }

    // Burn tokens
    function burnTokens(uint256 amount) public {
        require(amount > 0, "Burn amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _burn(msg.sender, amount);
    }
}




