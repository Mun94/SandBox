import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 30rem;
  label {
    position: absolute;
    bottom: 10px;
    left: 0;
    color: gray;
    pointer-events: none;
    transition: all 0.5s ease;
  }
  input:focus ~ label,
  input:valid ~ label {
    transform: translateY(-10px);
    font-size: 13px;
    color: #f7f2f2;
  }

  .underline {
    position: absolute;
    bottom: 0px;
    height: 2px;
    width: 100%;
  }

  .underline:before {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    background: #ffc200;
    transform: scaleX(0);
    transition: transform 0.3s linear;
  }
  input:focus ~ .underline:before,
  input:valid ~ .underline:before {
    transform: scaleX(1);
  }
`;

const SearchBarBlock = styled.input`
  width: 99%;
  background: none;
  border: none;
  color: white;
  border-bottom: 2px solid silver;
  &:focus {
    outline: none;
  }
`;

const SearchBar = (props) => (
  <Wrapper>
    <SearchBarBlock {...props} required />
    <div className="underline"></div>
    <label>Search..</label>
  </Wrapper>
);

export default SearchBar;
