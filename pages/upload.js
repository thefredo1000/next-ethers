import React from "react";
import DataCard from "../component/DataCard";
import Header from "../component/Header";
import UserCard from "../component/UserCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LENS_ABI from "../ABI/LensHub.json";
import UIDATAPROVIDER_ABI from "../ABI/UIDataProvider";
import { ethers } from "ethers";

const Feed = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);

  const [client, setclient] = useState({
    isConnected: false,
  });
  const checkConnection = async () => {
    if (window.ethereum) {
      sethaveMetamask(true);
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setclient({
          isConnected: true,
          address: accounts[0],
        });
      } else {
        setclient({
          isConnected: false,
        });
      }
    } else {
      sethaveMetamask(false);
    }
  };

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

  useEffect(() => {
    checkConnection();
  }, []);

  function sliceIPFS(ipfs) {
    return ipfs.slice(7);
  }
  const [handle, sethandle] = useState(null);
  const [profileId, setprofileId] = useState(null);
  const [profileImageURI, setprofileImageURI] = useState(null);

  const getHandle = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const lens = new ethers.Contract(
      "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d",
      LENS_ABI,
      signer
    );
    const uiDataProvider = new ethers.Contract(
      "0x8b0A28a8DE1de77668260A876c6DCF0330183742",
      UIDATAPROVIDER_ABI,
      signer
    );

    lens
      .tokenOfOwnerByIndex(
        "0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e",
        ethers.BigNumber.from(0)
      )
      .then((res) => {
        console.log(res.toString());
        lens.getHandle(res.toString()).then((res) => {
          sethandle(res.toString());
          uiDataProvider.getLatestDataByHandle(res.toString()).then((res) => {
            console.log(sliceIPFS(res.profileStruct.imageURI.toString()));
            setprofileImageURI(
              "https://ipfs.io/ipfs/" +
                sliceIPFS(res.profileStruct.imageURI.toString())
            );
          });
        });
      })
      .catch((err) => {
        console.log("err");
      });
  };
  getHandle();

  const router = useRouter();
  console.log(router.query.handle);

  function post() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const lens = new ethers.Contract(
      "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d",
      LENS_ABI,
      signer
    );
    const inputStruct = {
      profileId: 58417,
      contentURI:
        "https://ipfs.io/ipfs/QmQPDaxhB7SPG34HC7E2oXuaGgL6c6h7TgQC4SNSxZWYQB",
      collectModule: "0x23b9467334bEb345aAa6fd1545538F3d54436e96",
      collectModuleInitData: ethers.utils.defaultAbiCoder.encode(
        ["bool"],
        [true]
      ),
      referenceModule: "0x0000000000000000000000000000000000000000",
      referenceModuleInitData: [],
    };
    lens.post(inputStruct).then((res) => {
      console.log(res);
    });
  }

  return (
    <>
      <Header client={client} connectWeb3={connectWeb3} />
      <div
        className="container"
        style={{ justifyContent: "center", display: "flex", flex: "1" }}
      >
        {/* ---- */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              width: "20rem",
              backgroundColor: "white",
              paddingTop: "2rem",
              paddingBottom: "1rem",
              marginBottom: "1rem",
              borderRadius: "1rem",
            }}
          >
            <button onClick={() => post()}>asd</button>
          </div>
        </div>
        {/* ---- */}
      </div>
    </>
  );
};

export default Feed;
