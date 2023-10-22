import React, { useContext } from "react";
import { shortAddress } from "../utils/utils";
import { WalletContext } from "../contexts/WalletContext";

const MessageCard = ({ msg }) => {

  const {walletAddress} = useContext(WalletContext)

  return (
    <>
    {
      walletAddress === msg.senderAddress 
      ? <div class="bubbleWrapper">
          <div class="inlineContainer own">
            <div class="ownBubble own">
              {msg.content}
            </div>
          </div>
        </div>
      : <div class="bubbleWrapper">
          <div class="inlineContainer">
            <div class="otherBubble other">
              {msg.content}
            </div>
          </div>
        </div>
    }
      
      
      {/* <div className="msg-header flex">
        <div className="convo-info">
          <div>
            <b>{shortAddress(msg.senderAddress)}</b>
          </div>
          <div>{msg.content}</div>
        </div>
      </div> */}
    </>
  );
};

export default MessageCard;
