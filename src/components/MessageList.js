import React from "react";
import useStreamMessages from "../hooks/useStreamMessages";
import MessageCard from "./MessageCard";
import NftCard from "./NftCard";
import PaymentCard from "./PaymentCard";
const MessageList = ({ isNewMsg, convoMessages, selectedConvo }) => {
  
  useStreamMessages(selectedConvo);
  
  return (
    <div className="msgs-container flex flex-dir-col" id="style-4">
      <div className="mt-auto">
        {!isNewMsg &&
          convoMessages.map((msg) => {
            if((msg.content).slice(0,4) === '/nft'){
              return <NftCard key={msg.id} msg={msg} />;
            }
            else if((msg.content).split(":")[0] === "Transaction "){
              return <PaymentCard key={msg.id} msg={msg} />;
            }
            return <MessageCard key={msg.id} msg={msg} />;
          })}
      </div>
    </div>
  );
};

export default MessageList;
