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
import { abi } from "./ABI.js";
const ethers = require('ethers');
const EthersAdapter = require("@safe-global/protocol-kit")
const sapi = require("@safe-global/api-kit")
const SafeFactory = require("@safe-global/protocol-kit");
const SafeAccountConfig = require("@safe-global/protocol-kit");

const Home = () => {
  const [providerState] = useContext(XmtpContext);
  const { selectedConvo, setLinkToSend, linkToSend } = useContext(WalletContext)
  const { convoMessages, client } = providerState;
  const [msgTxt, setMsgTxt] = useState("");
  const { sendMessage } = useSendMessage(selectedConvo);
  useStreamConversations();
  const [isNewMsg, setIsNewMsg] = useState(false);

  const sendNewMessage = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send('eth_requestAccounts', []);
    let signer = provider.getSigner();

    if ("/pay" === msgTxt.substring(0, 4)) {
      sendToken(msgTxt,selectedConvo).then((data) => {
        sendMessage("Hey, I paid you " + msgTxt.split(" ")[1] + "  " + msgTxt.split(" ")[2]);
        sendMessage("Transaction :  https://goerli.etherscan.io/tx/" + data)
        setMsgTxt("");
      });

    }
    else {
      if("/stake"=== msgTxt.substring(0, 6)){
        const myArray = msgTxt.split(" ");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const accounts = await provider.send("eth_requestAccounts", []); //This is used to pop up metamask accounts list
        const account = accounts[0];
        console.log(" Address :" + account);
        const tokenAddress = '0xeF37717B1807a253c6D140Aca0141404D23c26D4'; //APE Token Address
        const tokenContract = new ethers.Contract(tokenAddress, abi, signer);
        console.log(ethers.utils.parseUnits(myArray[1]));
        const res = tokenContract.depositSelfApeCoin(ethers.utils.parseUnits(myArray[1]),{gasLimit : 500000});
        console.log(res);
        sendMessage("Transaction :  https://goerli.etherscan.io/tx/" + res)
        setMsgTxt("");
      }

      if ("/safe" === msgTxt.substring(0, 5)) {
        console.log("In ")
        console.log(`Selected Convo :` + selectedConvo)
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
      
          const safeFactory = await SafeFactory.SafeFactory.create({ ethAdapter: ethAdapterOwner1 },{gasLimit:50000000})
          const safeAccountConfig = {
            owners: [
              await signer.getAddress(),
              selectedConvo
            ],
            threshold: 2,
            // ... (Optional params)
          }
          const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig })
      
          const safeAddress = await safeSdkOwner1.getAddress()
      
          console.log('Your Safe has been deployed:')
          console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
          sendMessage(`Your Safe app with 2 Signers have been created ,please visit : https://app.safe.global/gor:${safeAddress}`)
          console.log(`https://app.safe.global/gor:${safeAddress}`)
        }catch(e){
          console.log(`Error is ${e}`);
        }
      }
      else{
        sendMessage(msgTxt);
        setMsgTxt("");
      }
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
