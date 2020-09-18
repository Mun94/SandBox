import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive.js';

const VideoBlock = styled(Responsive)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 630px) {
    width: 600px;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  color: #f7f2f2;
`;
const Img = styled.img`
  position: relative;
`;
const Duration = styled.span`
  position: absolute;
  color: white;
  transform: translateY(159px);
  background: rgba(0, 0, 0, 0.7);
  letter-spacing: 0.5px;
`;
const Sub = styled.span`
  margin-top: 0.3rem;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
  }
`;
const View = styled.span`
  color: rgba(0, 0, 0, 0.7);
`;
const PublishedAt = styled.span`
  color: rgba(0, 0, 0, 0.7);
`;

const Videos = ({ videoDetail }) => {
  return (
    <VideoBlock>
      {videoDetail.map((Info) => (
        <Wrapper key={Info.id}>
          <Img src={Info.medium.url} alt="" />
          <Duration>{Info.duration.slice(2, 20)}</Duration>
          <Sub>
            <div>
              <PublishedAt>{Info.publishedAt.split('T')[0]}</PublishedAt>
              <View>{Info.viewCount} view</View>
            </div>
            <Title>{Info.title}</Title>
          </Sub>
        </Wrapper>
      ))}
    </VideoBlock>
  );
};

export default Videos;
