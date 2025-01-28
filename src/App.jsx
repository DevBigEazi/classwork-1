import { ethers } from "ethers";
import { useState } from "react";
import contractAbi from "./abi.json";

import { ToastContainer, toast } from "react-toastify";
import { formatEther } from "ethers";

function App() {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [balance, setBalance] = useState();

  const contractAddress = "0x904C723011BF43ffd2AF6f85387AB3BC5B799F0C";

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const deposit = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      try {
        const tx = await contractInstance.deposit(depositAmount);
        const receipt = tx.wait();

        toast("Successfully deposit ether", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(receipt);
      } catch (error) {
        toast(`Error: ${error}` , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        console.log(error);
      }
    }
  };

  const withdraw = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      try {
        const tx = await contractInstance.withdraw(withdrawAmount);
        const receipt = tx.wait();

        toast("Successfully withdraw ether", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

        console.log(receipt);
      } catch (error) {
        toast(`Error: ${error}` , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      }
    }
  };

  const checkBalance = async() => {
    if (typeof window.ethereum !== "undefined") {
        await requestAccount();
  
        const provider = new ethers.BrowserProvider(window.ethereum);
    
        const contractInstance = new ethers.Contract(
          contractAddress,
          contractAbi,
          provider
        );
  
        try {
          const tx = await contractInstance.getBalance();
  
          toast("Successfully get the balance", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
        });

        const balance = formatEther(tx);

            setBalance(balance);
  
          console.log(tx);
          console.log(balance);
        } catch (error) {
          toast(`Error: ${error}` , {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
        }
      }
  }

  return (
    <div className="">
      <input
        type="text"
        placeholder="Deposit ether"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
      />
      <button onClick={deposit}>Deposit</button>

      <input
        type="text"
        placeholder="Withdraw ether"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
      />
      <button onClick={withdraw}>Withdraw</button>

      <p style={{backgroundColor: "white", height: "20px", padding: "10px", width: "100%", color: "green"}}>Balance: {balance}</p>
      <button onClick={checkBalance}>Check Balance</button>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
