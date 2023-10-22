import React, { useContext,useState } from "react";
import { shortAddress, truncate } from "../utils/utils";
import { WalletContext } from "../contexts/WalletContext";
import {resolution} from "./Resolver";

const ConversationCard = ({ address, latestMessage }) => {

  const [dname,setDName] = useState();
  resolution.reverse(address, {location: 'UNSLayer2'}).then((domain)=>setDName(domain));

  const {setSelectedConvo} = useContext(WalletContext);
  return (
    <div
      onClick={() => setSelectedConvo(address)}
      className="conversation-header flex justify-start"
    >
      <div className="identicon" />
      <div className="flex convo-info align-start flex-dir-col justify-start">
        <div>
        {dname ? 
          (<b>{dname}</b>): (<b>{shortAddress(address)}</b>)
        }
        </div>
        <div>{latestMessage && truncate(latestMessage.content, 75)}</div>
      </div>
    </div>
  );
};

export default ConversationCard;
