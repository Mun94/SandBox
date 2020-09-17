import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-left: 8rem;
  padding-right: 8rem;

  @media (max-width: 950px) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;

const LoadingSpace = styled.div`
  position: fixed;
  width: 3rem;
  height: 3rem;
  background: red;
  right: 2rem;
  bottom: 2rem;
`;

const Responsive = ({ children, ...rest }) => {
  return (
    <>
      <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
      <LoadingSpace />
    </>
  );
};

export default React.memo(Responsive);
