import React from "react";
import Metamask from "../component/metamask";
import { useState, useEffect } from "react";
import { signMessage } from "../utils/sign";
import Header from "./Header";
import { WorldIDWidget } from "@worldcoin/id";

const Home = () => {

  useEffect(() => {
    window;
  }, []);
  const [haveMetamask, sethaveMetamask] = useState(true);

  const [client, setclient] = useState({
    isConnected: false,
  });
  const [ethereum, setEthereum] = useState(null);
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

  return (
    <>
      <Header client={client} connectWeb3={connectWeb3}/>
      <section className="container d-flex">
        <main>
          <p>
            {!haveMetamask ? (
              <Metamask />
            ) : client.isConnected ? (
              <>
                <br />
                <h2>You're connected ✅</h2>
                <button
                  onClick={signMessage}
                  type="button"
                  className="btn sign-btn"
                >
                  Sign Message
                </button>
                <WorldIDWidget
                  actionId="wid_BPZsRJANxct2cZxVRyh80SFG" // obtain this from developer.worldcoin.org
                  signal="my_signal"
                  enableTelemetry
                  onSuccess={(verificationResponse) =>
                    console.log(verificationResponse)
                  }
                  onError={(error) => console.error(error)}
                />
                ;
              </>
            ) : (
              <>
                <br />
                <button className="btn connect-btn" onClick={connectWeb3}>
                  Connect Wallet
                </button>
              </>
            )}
          </p>
        </main>
      </section>
    </>
  );
};

export default Home;
