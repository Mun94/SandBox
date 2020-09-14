import React from 'react';
import styled, { css } from 'styled-components';

const ResponsiveBlock = styled.div`
  margin-left: 5rem;
  margin-right: 5rem;
  width: 100%;
  margin: 0 auto;

  ${(props) =>
    props.headerProps &&
    css`
      padding-left: 7rem;
      padding-right: 7rem;
    `}
`;

const LoadingSpace = styled.div`
  position: fixed;
  width: 1rem;
  height: 1rem;
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

export default Responsive;
