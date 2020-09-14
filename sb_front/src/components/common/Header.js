import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive.js';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled(Responsive)`
  height: 4.5rem;
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    letter-spacing: 1px;
  }
`;

const Spacer = styled.div`
  height: 4.5rem;
`;

const Header = () => {
  return (
    <>
      <HeaderBlock>
        <Wrapper headerProps>
          <Link to="/">SANDBOX</Link>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
