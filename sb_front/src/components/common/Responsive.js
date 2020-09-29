import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 870px) {
    width: 700px;
  }
  @media (max-width: 630px) {
    width: 600px;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
  }
`;

const Responsive = ({ children, ...rest }) => {
  return (
    <>
      <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
    </>
  );
};

export default React.memo(Responsive);
