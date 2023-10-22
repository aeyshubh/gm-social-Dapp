import React, {useState, useContext} from "react";
import AddressInput from "../AddressInput";
import { XmtpContext } from "../../contexts/XmtpContext";
import ConversationList from "../ConversationList";

const People = () => {
  const [providerState] = useContext(XmtpContext);
  const { convoMessages, client } = providerState;
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedConvo, setSelectedConvo] = useState(null);

  const checkIfOnNetwork = async (address) => {
    return (await client?.canMessage(address)) || false;
  };

  const onInputBlur = async (newAddress) => {
    if (!newAddress.startsWith("0x") || newAddress.length !== 42) {
      setErrorMsg("Invalid address");
    } else {
      const isOnNetwork = await checkIfOnNetwork(newAddress)
      if (!isOnNetwork) {
        setErrorMsg("Address not on XMTP network");
      } else {
        setSelectedConvo(newAddress)
        setErrorMsg("");
      }
    }
  };

  return (
    <div className="people-cont" id="style-4">
      <AddressInput
        isNewMsg="hi"
        onInputBlur={onInputBlur}
        errorMsg={errorMsg}
        selectedConvo={selectedConvo}
      />
      {
        client && 
        <ConversationList
          convoMessages={convoMessages}
          setSelectedConvo={setSelectedConvo}
        />
      }
    </div>
  );
};

export default People;
