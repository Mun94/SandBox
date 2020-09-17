import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonStyle = css`
  border: none;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  font-size: 0.8rem;
  border-radius: 4px;
  padding: 0.25rem 1rem;
  background: #f0f0f0;
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;
const StyledLink = styled(Link)`
  ${ButtonStyle}
`;

const StyledA = styled.a`
  ${ButtonStyle}
`;
const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} />
  ) : props.href ? (
    <StyledA {...props} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
