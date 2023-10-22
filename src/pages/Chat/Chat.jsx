import React, { useEffect } from "react";
import Chatting from "../../components/Chatting/Chatting";
import Container from "../../components/PeopleAndNft/Container";
import "./style.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
const Chat = () => {
  useEffect(() => {
    console.log(window.innerWidth);
  });
  return (
    <div className="container-1">
      {window.innerWidth > 768 ? <Container /> : <Header />}
      <Sidebar />
      <Chatting />
    </div>
  );
};

export default Chat;
