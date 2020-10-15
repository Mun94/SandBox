import React from 'react';
import styled from 'styled-components';
import palette from './palette.js';

const Wrapper = styled.div`
  position: relative;
  width: 30rem;
  height:25px;
  label {
    position: absolute;
    bottom: 10px;
    left: 0;
    color: ${palette.gray};
    pointer-events: none;
    transition: all 0.5s ease;
  }
  input:focus ~ label,
  input:valid ~ label {
    transform: translateY(-10px);
    font-size: 13px;
    color: ${palette.yellow}
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
    background: ${palette.yellow};
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
  color: ${palette.toneDownWhite};
  border-bottom: 2px solid silver;
  height: 18px;
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

export default React.memo(SearchBar);
