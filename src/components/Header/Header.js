import React from "react";
import './headerStyle.css'
import Container from "../PeopleAndNft/Container";

const Header = () => {

  return (
    <div className="header2">
      <input type="checkbox" id="active" />
      <label for="active" class="menu-btn"><span></span></label>
      <label for="active" class="close"></label>
      <div class="wrapper">
        <Container />
      </div>
      
    </div>
  );
};

export default Header;
