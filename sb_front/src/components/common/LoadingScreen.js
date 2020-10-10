import React from 'react';
import styled from 'styled-components';
import palette from './palette.js';

const ScreenLoader = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 100px;
  height: 100px;
  animation: LoadingScreen-animate 0.7s linear infinite;
  span {
    position: absolute;
    width: 50px;
    height: 50px;
    animation: LoadingScreen-rotate 0.7s linear infinite;
  }
  span:nth-child(1) {
    bottom: 0;
    right: 0;
    background: ${palette.yellow}
  }
  span:nth-child(2) {
    top: 0;
    right: 0;
    background: ${palette.loadingScreenBlue}; /*파랑*/
  }
  span:nth-child(3) {
    bottom: 0;
    left: 0;
    background:${palette.red};
  }

  @keyframes LoadingScreen-animate {
    0% {
      width: 100px;
      height: 100px;
    }
    10% {
      width: 100px;
      height: 100px;
    }
    50% {
      width: 150px;
      height: 150px;
    }
    90% {
      width: 100px;
      height: 100px;
    }
    100% {
      width: 100px;
      height: 100px;
    }
  }

  @keyframes LoadingScreen-rotate {
    0% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(0deg);
    }
    90% {
      transform: rotate(90deg);
    }
    100% {
      transform: rotate(90deg);
    }
  }
`;

const LoadingScreen = () => {
  return (
    <ScreenLoader>
      <span />
      <span />
      <span />
    </ScreenLoader>
  );
};

export default LoadingScreen;
