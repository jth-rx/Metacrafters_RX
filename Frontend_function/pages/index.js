import { useState, useEffect } from "react";
import { ethers } from "ethers";
import fund_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [fund, setFund] = useState(undefined);
  const [totalDonations, setTotalDonations] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [threshold, setThreshold] = useState("");
  const [donorAddress, setDonorAddress] = useState("");
  const [donorAmount, setDonorAmount] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const fundABI = fund_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      const account = await window.ethereum.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account.length > 0) {
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
    getFundContract();
  };

  const getFundContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const fundContract = new ethers.Contract(contractAddress, fundABI, signer);

    setFund(fundContract);
    getTotalDonations();
  };

  const getTotalDonations = async () => {
    if (fund) {
      const balance = await fund.getTotalDonations();
      setTotalDonations(ethers.utils.formatEther(balance));
    }
  };

  const donate = async () => {
    if (fund) {
      setLoading(true);
      try {
        const tx = await fund.donate({ value: ethers.utils.parseEther("1") });
        await tx.wait();
        getTotalDonations();
      } catch (error) {
        console.error("Donation failed:", error);
      }
      setLoading(false);
    }
  };

  const donateCustomAmount = async () => {
    if (fund) {
      setLoading(true);
      try {
        const tx = await fund.donate({ value: ethers.utils.parseEther(customAmount) });
        await tx.wait();
        setCustomAmount("");
        getTotalDonations();
      } catch (error) {
        console.error("Donation failed:", error);
      }
      setLoading(false);
    }
  };

  const withdrawFunds = async () => {
    if (fund) {
      setLoading(true);
      try {
        const tx = await fund.withdrawFunds();
        await tx.wait();
        getTotalDonations();
      } catch (error) {
        console.error("Withdrawal failed:", error);
      }
      setLoading(false);
    }
  };

  const updateThreshold = async () => {
    if (fund) {
      setLoading(true);
      try {
        const tx = await fund.updateThreshold(ethers.utils.parseEther(threshold));
        await tx.wait();
        setThreshold("");
        alert("Threshold updated successfully");
      } catch (error) {
        console.error("Threshold update failed:", error);
      }
      setLoading(false);
    }
  };

  const getDonationOf = async () => {
    if (fund && donorAddress) {
      try {
        const amount = await fund.getDonationOf(donorAddress);
        setDonorAmount(ethers.utils.formatEther(amount));
      } catch (error) {
        console.error("Failed to get donor amount:", error);
      }
    }
  };

  const logout = () => {
    setAccount(undefined);
    setFund(undefined);
    setTotalDonations(undefined);
    setLoading(false);
    window.location.reload();
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use the Community Donation Fund.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount} className="custom-button connect-button">Connect your MetaMask wallet</button>;
    }

    if (totalDonations === undefined) {
      getTotalDonations();
    }

    return (
      <div className="fund-dashboard">
        <h2>Your Account: {account}</h2>
        <h3>Total Donations: {totalDonations || 0} ETH</h3>
        <div className="fund-buttons">
          <button className="custom-button donate-button" onClick={donate} disabled={loading}>
            {loading ? "Processing..." : "Donate 1 ETH"}
          </button>
          <br></br>
          <input
            type="text"
            placeholder="Enter amount in ETH"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="custom-inputethamount"
          />
          <button className="custom-donbutton donate-button" onClick={donateCustomAmount} disabled={loading || !customAmount}>
            {loading ? "Processing..." : `Donate ${customAmount} ETH`}
          </button>
          <button className="custom-button withdraw-button" onClick={withdrawFunds} disabled={loading}>
            {loading ? "Processing..." : "Withdraw Funds"}
          </button>
          <br></br>
          <input
            type="text"
            placeholder="New Threshold"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="custom-inputtreshhold"
          />
          <button onClick={updateThreshold} className="custom-treshholdbutton threshold-button" disabled={!threshold}>
            Update Threshold
          </button>
          <br></br>
          <input
            type="text"
            placeholder="Enter Donor Address"
            value={donorAddress}
            onChange={(e) => setDonorAddress(e.target.value)}
            className="custom-inputaddress"
          />
          <button onClick={getDonationOf} className="custom-donoramount donation-check-button" disabled={!donorAddress}>
            Check Donor Amount
          </button>
          {donorAmount && <p>Donor Amount: {donorAmount} ETH</p>}
          <button onClick={logout} className="custom-donoramount logout-button">Logout</button>
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
        <h1>Welcome to Binance's Crypto Donation Drive</h1>
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
          text-align: center;
        }

        .custom-treshholdbutton{
          width: 50%;
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

          .custom-checkdonorbutton{
          width: 70%;
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

        .custom-donbutton{
          width: 70%;
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

        .custom-donoramount{
          width: 40%;
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


        .donate-button {
          width: 50%;
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
          width: 50%;
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
          
        .custom-inputethamount {
          margin: 10px;
          padding: 20px;
          width: 80px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .custom-inputtreshhold {
          margin: 10px;
          padding: 20px;
          width: 90px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .custom-inputaddress {
          margin: 10px;
          padding: 20px;
          width: 285px;
          border: 1px solid #ccc;
          border-radius: 5px;
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
