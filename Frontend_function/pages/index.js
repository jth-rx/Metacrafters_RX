import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      const account = await window.ethereum.request({ method: "eth_accounts" });
      handleAccount(account);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      setAccount(account[0]);
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
    getBalance();
  };

  const getBalance = async () => {
    if (atm) {
      const balance = await atm.getBalance();
      setBalance(balance.toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      setLoading(true);
      let tx = await atm.deposit(1);
      await tx.wait();
      setLoading(false);
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      setLoading(true);
      let tx = await atm.withdraw(1);
      await tx.wait();
      setLoading(false);
      getBalance();
    }
  };

  const withdrawAll = async () => {
    if (atm) {
      setLoading(true);
      try {
        // Call withdrawAll and set an explicit gasLimit if needed
        let tx = await atm.withdrawAll({
          gasLimit: 100000 // Adjust gas limit if needed
        });
        await tx.wait();
        setLoading(false);
        getBalance(); // Update balance after withdrawal
      } catch (error) {
        setLoading(false);
        console.error("Error during withdrawAll:", error);
      }
    }
  };
  

  // Logout function
  const logout = () => {
    // Reset all relevant state to initial values
    setAccount(undefined);
    setATM(undefined);
    setBalance(undefined);
    setLoading(false);
    window.location.reload();
  };


  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount} className="custom-button connect-button">Connect your MetaMask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div className="atm-dashboard">
        <h2>Your Account: {account}</h2>
        <h3>Your Balance: {balance} ETH</h3>
        <div className="atm-buttons">
          <button 
            className="custom-button deposit-button" 
            onClick={deposit} 
            disabled={loading}
          >
            {loading ? "Processing..." : "Deposit 1 ETH"}
          </button>
          <button 
            className="custom-button withdraw-button" 
            onClick={withdraw} 
            disabled={loading}
          >
            {loading ? "Processing..." : "Withdraw 1 ETH"}
          </button>
          <button 
            className="custom-button withdrawall-button" 
            onClick={withdrawAll} 
            disabled={loading}
          >
            {loading ? "Processing..." : "Withdraw All ETH"}
          </button>

          <button onClick={logout} className="custom-button logout-button">Logout</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to JethCoins ATM</h1>
      </header>
      {initUser()}
      <style global jsx>{`
        body {
          margin: 0;
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #151515, #2a2a2a);
          color: white;
        }

        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          box-sizing: border-box;
          background-image: url('https://wallpapers.com/images/hd/yellow-techno-binance-al3wpn2n0ayuii90.jpg');
          background-size: cover;
          background-position: center;
        }

        .custom-button {
          width: 100%;
          padding: 15px;
          font-size: 1.1em;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          font-weight: bold;
          letter-spacing: 1px;
          margin: 10px 0;
          outline: none;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        .connect-button {
          background: linear-gradient(135deg, #202020, #333533);
          color: white;
        }

        .deposit-button {
          background: linear-gradient(135deg, #4CAF50, #45a049);
          color: white;
        }

        .withdraw-button {
          background: linear-gradient(135deg, #f44336, #d32f2f);
          color: white;
        }

        .withdrawall-button {
          background: linear-gradient(135deg, #660708, #161a1d);
          color: white;
        }

        .custom-button:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .custom-button:disabled {
          background: #888;
          cursor: not-allowed;
          transform: none;
          filter: none;
          box-shadow: none;
        }

        .atm-dashboard {
          background-color: rgba(30, 30, 30, 0.9);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          width: 100%;
          max-width: 560px;
          border: 1px solid #333;
        }

        .atm-buttons {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 100%;
          margin-top: 20px;
        }

        header {
          background-color: rgba(35, 35, 35, 0.8);
          color: #FFD700;
          padding: 20px;
          width: 100%;
          text-align: center;
          font-size: 2em;
          border-bottom: 1px solid #333;
          margin-bottom: 30px;
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}
