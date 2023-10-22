import React, { useContext, useState, useEffect } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import useSendMessage from "../hooks/useSendMessage";
import Header from "./Header/Header";
import CardHeader from "./CardHeader";
import MessageComposer from "./MessageComposer";
import AddressInput from "./AddressInput";
import BackButton from "./BackButton";
import MessageList from "./MessageList";
import ConversationList from "./ConversationList";
import useStreamConversations from "../hooks/useStreamConversations";
import { sendToken } from './Payment';
import Nft from "./Nft";
import { WalletContext } from "../contexts/WalletContext";
import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import SafeApiKit from "@safe-global/api-kit";
import { SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit'

const Home = () => {
  const [providerState] = useContext(XmtpContext);
  const { selectedConvo, setLinkToSend, linkToSend } = useContext(WalletContext)
  const { convoMessages, client } = providerState;
  const [msgTxt, setMsgTxt] = useState("");
  const { sendMessage } = useSendMessage(selectedConvo);
  useStreamConversations();
  const [isNewMsg, setIsNewMsg] = useState(false);

  const sendNewMessage = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send('eth_requestAccounts', []);
    let signer = provider.getSigner();

    if ("/pay" === msgTxt.substring(0, 4)) {
      sendToken(msgTxt).then((data) => {
        sendMessage("Hey, I paid you " + msgTxt.split(" ")[1] + "  " + msgTxt.split(" ")[2]);
        sendMessage("Transaction :  https://goerli.etherscan.io/tx/" + data)
        setMsgTxt("");
      });

    }
    else {
      if ("/safe" === msgTxt.substring(0, 5)) {
        console.log("In ")
        console.log(`Selected Convo :` + peerAddress)
        provider = new ethers.providers.Web3Provider(window.ethereum);
        provider.send('eth_requestAccounts', []);
        signer = provider.getSigner();
        try{
          const ethAdapterOwner1 = new EthersAdapter.EthersAdapter({
            ethers,
            signerOrProvider:signer
          })
          console.log(ethAdapterOwner1)
          const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
         // const safeService = new sapi.SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner1 })
      
          const safeFactory = await SafeFactory.SafeFactory.create({ ethAdapter: ethAdapterOwner1 })
          const safeAccountConfig = {
            owners: [
              await signer.getAddress(),
              "0xA85CCf0862131b38A898a3afE860797dCBfc08FD"
            ],
            threshold: 1,
            // ... (Optional params)
          }
          const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig })
      
          const safeAddress = await safeSdkOwner1.getAddress()
      
          console.log('Your Safe has been deployed:')
          console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
          console.log(`https://app.safe.global/gor:${safeAddress}`)
        }catch(e){
          console.log(`Error is ${e}`);
        }
      }
      sendMessage(msgTxt);
      setMsgTxt("");
    }

  };

  useEffect(() => {
    if (linkToSend) {
      setMsgTxt(linkToSend);
      setLinkToSend("");
    }
  })

  return (
    <div className="flex align-center flex-dir-col home">
      {client && (
        <div className="card cont">
          {!selectedConvo && !isNewMsg ? (
            <>

            </>
          ) : (
            <>
              <p className="addr"><i class='bx bx-user-circle fa fa-2x' ></i> {selectedConvo}</p>
              <MessageList
                isNewMsg={isNewMsg}
                convoMessages={convoMessages.get(selectedConvo) ?? []}
                selectedConvo={selectedConvo}
              />
              <MessageComposer
                msgTxt={msgTxt}
                setMsgTxt={setMsgTxt}
                sendNewMessage={sendNewMessage}
                sendMessage={sendMessage}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
