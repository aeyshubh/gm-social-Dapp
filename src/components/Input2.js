import React from "react";
import useSendMessage from "../hooks/useSendMessage";
import useStreamConversations from "../hooks/useStreamConversations";

const Input2 = ({ onInputBlur, value, setNewValue, placeholder }) => {
  
  const { sendMessage } = useSendMessage(value);
  useStreamConversations();

  const call = () => {
    onInputBlur()
    sendMessage("hi")
  }

  return (
  <div style={{display:"flex",alignItems:"center", justifyContent:"space-around",flexDirection:"row"}}>
    <input
      value={value}
      onChange={(e) =>{setNewValue(e.target.value);} }
      type="text"
      className="text-input2"
      placeholder={placeholder}
    />
    <button className="inp-btn" title="search people by wallet-address"><i class='bx bx-search-alt-2'></i></button>
    <button className="inp-btn" title="Add new people wallet-address" onClick={call}><i class='bx bx-message-square-add' ></i></button>
  </div>
)};

export default Input2;
