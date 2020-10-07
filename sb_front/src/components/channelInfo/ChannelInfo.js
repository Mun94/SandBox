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
  }
  div:nth-child(1):hover {
    background: #ffc200;
    border-radius: 4px;
  }
  div:nth-child(2) {
    text-align: center;
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
                    <div>{ch.name}</div>
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
