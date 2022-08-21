import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { signMessage } from "../utils/sign";

import Metamask from "../component/metamask";
import Feed from "../component/Feed";
import Home from "../component/Home";

// 1. import `ChakraProvider` component
import LENS_ABI from "../abi/LensHub.json";
import { ethers } from "ethers";

import Link from "next/link";

const feed = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);

  const [client, setclient] = useState({
    isConnected: false,
  });

  const connectWeb3 = async () => {
    try {

      if (!window.ethereum) {
        console.log("Metamask not detected");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setclient({
        isConnected: true,
        address: accounts[0],
      });
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };


  const getHandle = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const lens = new ethers.Contract(
      "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d",
      LENS_ABI,
      signer
    );

    lens
      .defaultProfile("0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getHandle();

  return (
    <Feed />
  );
};

export default feed;
