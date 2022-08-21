import React from "react";
import DataCard from "../../component/DataCard";
import Header from "../../component/Header";
import UserCard from "../../component/UserCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LENS_ABI from "../../ABI/LensHub.json";
import UIDATAPROVIDER_ABI from "../../ABI/UIDataProvider";
import { ethers } from "ethers";
import axios from "axios";

function sliceIPFS(ipfs) {
  return ipfs.slice(7);
}

function Feed(props) {
// const router = useRouter();
//   const handle = router.query.handle ? router.query.handle : "";
  const handle = "erminio.lens"
  const [profileId, setProfileId] = useState(null);
  const [profileImageURI, setprofileImageURI] = useState(null);

  const [client, setclient] = useState({
    isConnected: false,
  });
  const [ethereum, setEthereum] = useState(null);
  const [haveMetamask, sethaveMetamask] = useState(true);
  const checkConnection = async () => {
    if (window.ethereum) {
      setEthereum(window.ethereum);
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

  const [pubURI, setPubURI] = useState([]);
  const getData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
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
    uiDataProvider.getLatestDataByHandle(handle).then((res) => {
      setprofileImageURI(
        "https://ipfs.io/ipfs/" +
          sliceIPFS(res.profileStruct.imageURI.toString())
      );
      console.log(profileImageURI);
    });
    // lens.getProfileIdByHandle(handle).then((res) => {
    //   console.log(res.toString());
    //   setProfileId(res);
    //   for (let i = 0; i < 10; i++) {
    //     lens.getContentURI(res, ethers.BigNumber.from(i)).then((res) => {
    //       console.log(res);
    //       setPubURI(pubURI.concat(res));
    //     });
    //   }
    // });
  };

  useEffect(async () => {
    getData()
    console.log("end");
  }, []);

  console.log(pubURI);
  const data = [
    {
      id: 1,
      title: "Title 1",
      description: "Description 1",
      image:
        "https://i.picsum.photos/id/1047/200/300.jpg?hmac=qKpI7C3-gy7En06KAzy2pm7dQAJncqoXDDZxLomHAGY",
    },
    {
      id: 2,
      title: "Title 2",
      description: "Description 2",
      image:
        "https://i.picsum.photos/id/1047/200/300.jpg?hmac=qKpI7C3-gy7En06KAzy2pm7dQAJncqoXDDZxLomHAGY",
    },
    {
      id: 3,
      title: "Title 3",
      description: "Description 3",
      image:
        "https://i.picsum.photos/id/1047/200/300.jpg?hmac=qKpI7C3-gy7En06KAzy2pm7dQAJncqoXDDZxLomHAGY",
    },
    {
      id: 4,
      title: "Title 4",
      description: "Description 4",
      image:
        "https://i.picsum.photos/id/1047/200/300.jpg?hmac=qKpI7C3-gy7En06KAzy2pm7dQAJncqoXDDZxLomHAGY",
    },
  ];
  const cards = data.map((item) => (
    <DataCard
      title={item.title}
      image={item.image}
      id={item.id}
      description={item.description}
    />
  ));

  const follow = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();

    const lens = new ethers.Contract(
      "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d",
      LENS_ABI,
      signer
    );
    lens.getProfileIdByHandle(handle).then((res) => {
      console.log(res);
      setProfileId(res);
    });
    lens.follow([profileId], [[]]).then((res) => {
      console.log(res);
    })

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
          <UserCard handle={handle} profileImageURI={profileImageURI} />
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
            <button className="btn connect-btn" onClick={() => follow()}>Follow</button>
          </div>
          <div>
            <button></button>
          </div>
          {cards}
        </div>
        {/* ---- */}
      </div>
    </>
  );
}

export default Feed;
