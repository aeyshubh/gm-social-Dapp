import React, { useContext } from "react";
import "./style.css";
import logo from "../../assets/gm4.png";
import { XmtpContext } from "../../contexts/XmtpContext";
import { WalletContext } from "../../contexts/WalletContext";
import { shortAddress } from "../../utils/utils";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { connectWallet, walletAddress, signer } = useContext(WalletContext);
  const [providerState] = useContext(XmtpContext);
  return (
    <nav className="main-menu">
      <img src={logo} alt="" className="logo" />
      <ul>
        <li style={{marginTop:"300px"}}>
          <Link to="/">
            <i class="fa bx bxs-dashboard fa-2x"></i>
            <span className="nav-text">Home</span>
          </Link>
        </li>
        <li className="has-subnav">
          <Link to="/Chat">
            <i class="fa fa-2x bx bx-chat"></i>
            <span className="nav-text">Chatting</span>
          </Link>
        </li>
      </ul>

      <ul className="logout">
        <li>
          <a href="#">
            <i class="fa fa-2x bx bx-wallet-alt"></i>
            {walletAddress ? (
              <>
                {!providerState.client ? (
                  <span
                    onClick={() => providerState.initClient(signer)}
                    className="nav-text"
                  >
                    Connect to XMTP
                  </span>
                ) : (
                  <p style={{ marginRight: "40px" }}>
                    {shortAddress(walletAddress)}
                  </p>
                )}
              </>
            ) : (
              <span className="nav-text" onClick={connectWallet}>
                {!window.ethereum || !window.ethereum.isMetaMask
                  ? "Install MetaMask"
                  : "Connect wallet"}
              </span>
            )}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
