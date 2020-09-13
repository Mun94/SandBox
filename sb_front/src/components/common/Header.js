import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderBlock = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 3rem;
  background: white;
  z-index: 1;
  box-shadow: 0px 2px #f7e707;
  a {
    text-decoration: none;
    color: black;
  }
`;
const Spacer = styled.div`
  height: 4rem;
`;

const Header = () => {
  return (
    <>
      <HeaderBlock>
        <span />
        <span>
          <Link to="/">Sand Box</Link>
        </span>
        <span />
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
