import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive.js';

const VideoBlock = styled(Responsive)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Videos = ({ videoDetail }) => {
  return (
    <VideoBlock>
      {videoDetail.map((Info) => (
        <Wrapper key={Info.id}>
          <img src={Info.medium.url} alt="" />
        </Wrapper>
      ))}
    </VideoBlock>
  );
};

export default Videos;
