import React, { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";
import { shortAddress } from "../utils/utils";
import xmtpLogo from "../assets/gm4.png";
import { XmtpContext } from "../contexts/XmtpContext";

const Header = () => {
  const { connectWallet, walletAddress, signer } = useContext(WalletContext);
  const [providerState] = useContext(XmtpContext);

  return (
    <>
      {walletAddress ? (
        <div className="flex align-center header-mobile">
          <h3>{shortAddress(walletAddress)}</h3>
          {!providerState.client && (
            <button
              className="btn"
              onClick={() => providerState.initClient(signer)}
            >
              Connect to XMTP
            </button>
          )}
        </div>
      ) : (
        <button className="btn" onClick={connectWallet}>
          {!window.ethereum || !window.ethereum.isMetaMask
            ? "Install MetaMask"
            : "Connect wallet"}
        </button>
      )}
    </>
  );
};

export default Header;
