import React, { useState } from "react";
import DataCard from "./DataCard";
import Link from "next/link";
import LENS_ABI from "../abi/LensHub.json";
import { ethers } from "ethers";

function Header(props) {
  const [handle, sethandle] = useState(null);
  const getHandle = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const lens = new ethers.Contract(
      "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d",
      LENS_ABI,
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
        });
      })
      .catch((err) => {
        console.log("err");
      });
  };
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
        "https://ipfs.io/ipfs/QmVkio8b3ekFdZairN2iZTzUismBFzArjGd33Yua3uQSwo",
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
  getHandle();
  return (
    <nav className="fren-nav d-flex">
      <div className="d-flex">
        <Link href="/">
          <button className="btn connect-btn">home</button>
        </Link>

        <Link href="/feed">
          <button className="btn connect-btn">feed</button>
        </Link>
      </div>
      <div className="d-flex" style={{ marginLeft: "auto" }}>
        <div style={{ paddingRight: "10px" }}>
          <button className="btn connect-btn" onClick={() => post()}>
            New Post
          </button>
        </div>
        <div>
          <button className="btn connect-btn" onClick={props.connectWeb3}>
            {handle ? (
              handle
            ) : props.client.isConnected ? (
              <>
                {props.client.address.slice(0, 4)}...
                {props.client.address.slice(38, 42)}
              </>
            ) : (
              <>Connect Wallet</>
            )}
          </button>
        </div>
        <div></div>
      </div>
    </nav>
  );
}

export default Header;
