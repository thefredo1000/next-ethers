import React from "react";
import DataCard from "./DataCard";
import Header from "./Header";
import UserCard from "./UserCard";
import { useState, useEffect } from "react";

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
  return (
    <>
      <Header client={client} connectWeb3={connectWeb3} />
      <div className="container" style={{justifyContent:"center", display:"flex", flex:"1"}}>
          {/* ---- */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {cards}
          </div>
          {/* ---- */}
      </div>
    </>
  )
};

export default Feed;
