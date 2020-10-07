import React from 'react';
import styled from 'styled-components';
import Response from '../common/Responsive.js';
import { Link } from 'react-router-dom';
import routes from '../../routes/routes.js';

const ChannelInfoBlock = styled(Response)`
  display: flex;
  flex-direction: column;
  color: #f7f2f2;
  align-items: center;
  img {
    border-radius: 60%;
    width: 8rem;
    height: 8rem;
    margin-bottom: 1rem;
  }
`;

const Div = styled.div`
  width: 70%;
  border-bottom: 1px solid gray;
  margin: 1rem 0;
`;

const SubInfo = styled(Response)`
  width: 70%;
  color: #f7f2f2;
  display: flex;
  justify-content: space-around;
`;

const NameSubs = styled.div`
  div:nth-child(1) {
    font-size: 1.3rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    padding: 10px 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    margin-bottom: 1rem;
  }
  div:nth-child(1):before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    bottom: 2px;
    width: 50%;
    background: rgba(255, 255, 255, 0.05);
  }
  div:nth-child(1):hover {
    color: #ffc200;
  }
  div:nth-child(2) {
    text-align: center;
  }

  a span:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, blue, pink);
    /*line 생성*/

    animation: animate1 1.5s linear infinite; /* 에니메이션 */
  }

  @keyframes animate1 {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  } /*에니메이션 조건*/

  a span:nth-child(2) {
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, blue, pink);

    animation: animate2 1.5s linear infinite;
    animation-delay: 0.8s;
  }

  @keyframes animate2 {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }

  a span:nth-child(3) {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to left, blue, pink);

    animation: animate3 1.5s linear infinite;
  }

  @keyframes animate3 {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  a span:nth-child(4) {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(to top, blue, pink);

    animation: animate4 1.5s linear infinite;
    animation-delay: 0.8s;
  }

  @keyframes animate4 {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
`;

const Description = styled.div`
  width: 70%;
  text-align: center;
`;

const ChannelInfo = ({ channelInfo, channelId }) => {
  return (
    <>
      {channelInfo.map(
        (ch) =>
          ch.channelId === channelId && (
            <span key={ch.id}>
              <ChannelInfoBlock>
                <img src={ch.profileUrl} alt="" />
                <NameSubs>
                  <Link to={routes.videos(ch.channelId)}>
                    <div>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      {ch.name}
                    </div>
                  </Link>
                  <div>{ch.subs}명</div>
                </NameSubs>
                <Div />
                <Description>{ch.description}</Description>
                <Div />
              </ChannelInfoBlock>
              <SubInfo>
                <span>총 비디오 수 {ch.videoCount}개</span>
                <span>채널 개설일 {ch.publishedAt.split('T')[0]}</span>
              </SubInfo>
            </span>
          ),
      )}
    </>
  );
};

export default React.memo(ChannelInfo);
