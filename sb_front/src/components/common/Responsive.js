import React from "react";
import styled from "styled-components";

const ResponsiveBlock = styled.div`
  margin-left: 5rem;
  margin-right: 5rem;
  border: 1px solid gray;
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
