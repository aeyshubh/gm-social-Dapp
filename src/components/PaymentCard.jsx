import React, { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";

const PaymentCard = ({ msg }) => {
  const { walletAddress } = useContext(WalletContext);
  return (
    <>
      {walletAddress === msg.senderAddress ? (
        <div class="bubbleWrapper">
          <div class="inlineContainer own">
            <div class="ownBubble own">
              {msg.content && (
                <>
                  <a href={msg.content.split(" ")[3]} target="_blank">
                    {msg.content}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div class="bubbleWrapper">
          <div class="inlineContainer">
            <div class="otherBubble other">
              {msg.content && (
                <>
                  <a href={msg.content.split(" ")[3]} target="_blank">
                    {msg.content}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentCard;
