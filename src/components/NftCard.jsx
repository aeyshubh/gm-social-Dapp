import React, { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";

const NftCard = ({ msg }) => {
    
  const {walletAddress} = useContext(WalletContext)

  return (
    <>
    {
      walletAddress === msg.senderAddress 
      ? <div class="bubbleWrapper">
          <div class="inlineContainer own">
            <div class="ownBubble own">
            {msg.content && (
                <>
                    <a href={msg.content.slice(5,msg.content.length)} target="_blank">
                        <img src={msg.content.slice(5,msg.content.length)} height="100px" width="100px" />
                    </a>
                </>
            )}
            </div>
          </div>
        </div>
      : <div class="bubbleWrapper">
          <div class="inlineContainer">
            <div class="otherBubble other">
            {msg.content && (
                <>
                    <a href={msg.content.slice(5,msg.content.length)} target="_blank">
                        <img src={msg.content.slice(5,msg.content.length)} height="100px" width="100px" />
                    </a>
                </>
            )}
            </div>
          </div>
        </div>
    }
      {/* <div className="msg-header flex justify-start">
        <div className="convo-info align-start flex-dir-col flex justify-start">
          <div>{msg.content && (
            <>
                <a href={msg.content.slice(5,msg.content.length)} target="_blank">
                    <img src={msg.content.slice(5,msg.content.length)} height="100px" width="100px" />
                </a>
            </>
      )}</div>
        </div>
      </div> */}
    </>
  );
};

export default NftCard;