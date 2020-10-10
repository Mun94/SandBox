import React from 'react';
import styled from 'styled-components';
import palette from './palette.js';

const Cube = styled.div`
  animation: LoadingSub-rotate 7000ms linear infinite;
  height: 100px;
  left: 0;
  right: 0;
  margin: auto;
  position: absolute;
  transform-style: preserve-3d;
  top: 0;
  bottom: 0;
  width: 100px;

  @keyframes LoadingSub-rotate {
    100% {
      transform: rotateY(360deg) rotateX(720deg) rotateZ(1080deg);
    }
  }

  .face {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .front {
    background: ${palette.yellow};
    transform: translateZ(50px);
  }

  .back {
    background: ${palette.yellow};
    transform: translateZ(-50px);
  }

  .left {
    background: ${palette.red};
    transform: translateX(-50px) rotateY(90deg);
  }

  .right {
    background: ${palette.red};
    transform: translateX(50px) rotateY(90deg);
  }

  .top {
    background: ${palette.loadingScreenBlue};
    transform: translateY(-50px) rotateX(90deg);
  }

  .bottom {
    background: ${palette.loadingScreenBlue};
    transform: translateY(50px) rotateX(90deg);
  }
`;

const LoadingSub = () => {
  return (
    <Cube>
      <div className="face front"></div>
      <div className="face back"></div>
      <div className="face left"></div>
      <div className="face right"></div>
      <div className="face top"></div>
      <div className="face bottom"></div>
    </Cube>
  );
};

export default LoadingSub;
