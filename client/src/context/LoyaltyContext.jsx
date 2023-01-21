import React, { Children, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI } from "../utils/constants";
import { contractAddress } from "../utils/constants";
import { getTimeStamp } from "../utils/constants";
import { shortenAddress } from "../utils/shortenAddress";

export const LoyaltyContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const loyaltyContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return loyaltyContract;
};

export const LoyaltyProvider = ({ children }) => {
  const [count, setCount] = useState(1);
  const [customerRequestAddress, setCustomerRequestAddress] = useState("");
  const [customerRequestAddressArray, setCustomerRequestAddressArray] =
    useState([]);
  const [currentAccount, setCurrentAccount] = useState("");

  const [userAddress, setUserAddress] = useState("");

  const [initialPoints, setInitialPoints] = useState({
    amazonPoint: "",
    flipkartPoint: "",
    myntraPoint: "",
  });

  const [formData, setFormData] = useState({
    sourceCompany: "amazon",
    destinationCompany: "amazon",
    companyPoints: 0,
  });

  const [transferFormData, setTransferFormData] = useState({
    receiverAddress: "",
    sourceCompany: "amazon",
    companyPoints: 0,
  });

  const [transactionRecords, setTransactionRecords] = useState([]);

  const [allPoints, setAllPoints] = useState({
    amazon: 0,
    flipkart: 0,
    myntra: 0,
  });

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("Please install Metamask");

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length > 0) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      console.log(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const addUserTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const loyaltyContract = getEthereumContract();
      const { amazonPoint, flipkartPoint, myntraPoint } = initialPoints;
      const transactionHash = await loyaltyContract.addUser(
        userAddress,
        amazonPoint,
        flipkartPoint,
        myntraPoint
      );
      console.log(transactionHash);
      alert("Customer Added Successfully");
      // console.log(`Success- ${transactionHash.hash}`);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const convertPointTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const { sourceCompany, destinationCompany, companyPoints } = formData;
      const TimeStamp = String(getTimeStamp());
      const loyaltyContract = getEthereumContract();
      console.log(formData);
      const transactionHash = await loyaltyContract.convert_reward_point(
        sourceCompany,
        destinationCompany,
        companyPoints,
        TimeStamp
      );
      // console.log(transactionHash);
      alert("Points Converted Successfully");
      // setTimeout(() => {
      //   window.location.reload(false);
      // }, 15000);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const transferPointTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const { receiverAddress, sourceCompany, companyPoints } =
        transferFormData;
      if (companyPoints > allPoints.sourceCompany) {
        alert("Points Deficiency...");
        return;
      }
      console.log(allPoints);
      const TimeStamp = String(getTimeStamp());
      const loyaltyContract = await getEthereumContract();
      const transactionHash = await loyaltyContract.transfer_reward_friend(
        receiverAddress,
        sourceCompany,
        companyPoints,
        TimeStamp
      );
      // console.log(transactionHash);
      alert("Points Transferred Successfully");
      // setTimeout(() => {
      //   window.location.reload(false);
      // }, 15000);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const fetch_allTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const loyaltyContract = getEthereumContract();
      const availableTransactions =
        await loyaltyContract.get_All_Transactions();
      const structuredTransactions = availableTransactions.map((obj) => ({
        sender_address: obj.sender_address,
        receiver_address: obj.receiver_address,
        source_company_name: obj.source_company_name,
        destination_company_name: obj.destination_company_name,
        reward_points: parseInt(obj.reward_points._hex, 16),
        TimeStamp: obj.timestamp,
      }));
      setTransactionRecords(structuredTransactions);
      // console.log("fetch_allTransactions", availableTransactions);
    } catch (err) {
      console.log("fetch_allTransactions", err);
    }
  };

  const fetch_allPoints = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const loyaltyContract = getEthereumContract();
      const return_object = await loyaltyContract.get_allPoints();
      setAllPoints({
        ...allPoints,
        amazon: return_object[0],
        flipkart: return_object[1],
        myntra: return_object[2],
      });
      // console.log("fetch_allPoints", return_object);
    } catch (err) {
      console.log("fetch_allPoints", err);
    }
  };

  const checkUserIsPresentInNetwork = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const loyaltyContract = getEthereumContract();
      const returnUserStatus = await loyaltyContract.validate_User();
      console.log(returnUserStatus);
      return returnUserStatus;
    } catch (err) {
      console.log("User not found", err);
    }
  };

  const customerRequestFetch = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const loyaltyContract = getEthereumContract();
      const userRequests = await loyaltyContract.getCustomerRequestsArray();
      // console.log(userRequests);

      setCustomerRequestAddressArray(userRequests);
    } catch (err) {
      console.log("User not found", err);
    }
  };

  useEffect(() => {
    customerRequestFetch();
    const run = async () => {
      const userStatus = await checkUserIsPresentInNetwork();
      console.log("count", count, "User exists", userStatus);
      if (userStatus) {
        try {
          await checkIfWalletIsConnected();
          await fetch_allPoints();
          await fetch_allTransactions();

          alert("Connected to LOYALTY NETWORK");
        } catch (err) {
          console.log(err);
        }
      } else {
        setAllPoints({
          amazon: 0,
          flipkart: 0,
          myntra: 0,
        });
        alert(
          "You are Not connected to LOYALTY NETWORK. Please request the admin by clicking REQUEST TO ADD button"
        );
      }
      // }
    };

    if (count != 2) {
      run();
    }
    setCount((prev) => prev + 1);

    const checkingIfSameAccount = async () => {
      await checkIfWalletIsConnected();
    };

    const interval = setInterval(() => {
      checkingIfSameAccount();
      fetch_allPoints();
      fetch_allTransactions();
    }, 10000);

    return () => clearInterval(interval);
  }, [currentAccount]);

  const checkIfAdminAccount = () => {
    if (
      currentAccount ==
      "0x68C348EfeB1BF8301547F51De795bFC8f1cd67c2".toLowerCase()
    ) {
      return true;
    } else return false;
  };

  const customerAddFunction = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const loyaltyContract = await getEthereumContract();
      const result = await loyaltyContract.customerAddFunction();
      // console.log(Buffer(result, 'hex').toString('utf8'));
      // console.log(result)
      // if (result == 1) {
      //   alert("User is already part of LOYALTY NETWORK");
      // } else if (result == 2) {
      //   alert("User has already made request");
      // } else {
      //   alert("Congratulations We have received your request");
      // }
      alert("Congratulations We have received your request");

    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  return (
    <LoyaltyContext.Provider
      value={{
        connectWallet,
        currentAccount,
        initialPoints,
        setInitialPoints,
        userAddress,
        setUserAddress,
        addUserTransaction,
        formData,
        setFormData,
        convertPointTransaction,
        transferFormData,
        setTransferFormData,
        transferPointTransaction,
        transactionRecords,
        allPoints,
        getTimeStamp,
        customerRequestAddress,
        setCustomerRequestAddress,
        customerAddFunction,
        checkIfAdminAccount,
        customerRequestAddressArray,
        setCustomerRequestAddressArray,
        customerRequestFetch,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};
