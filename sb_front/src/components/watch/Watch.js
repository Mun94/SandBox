import React, { useCallback } from 'react';
import styled from 'styled-components';
import { List } from 'react-virtualized';

const VideoCommentBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Video = styled.div`
  display: flex;
  flex-direction: column;
`;

const ComBlock = styled.div`
  display: flex;
`;

const Img = styled.img`
  border-radius: 60%;
  width: 2.5rem;
  height: 2.5rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const NamePublishedAt = styled.div`
  display: flex;
`;

const Text = styled.div``;

const LikeCount = styled.div``;

const Watch = ({ query, videoDetail, commentDetail }) => {
  const rowComment = useCallback(
    ({ index, key, style }) => {
      const comment = commentDetail[index];

      return (
        <ComBlock key={key} style={style}>
          <Img />
          <Content>
            <NamePublishedAt></NamePublishedAt>
            <Text></Text>
            <LikeCount></LikeCount>
          </Content>
        </ComBlock>
      );
    },
    [commentDetail],
  );

  return (
    <VideoCommentBlock>
      <Video>
        <iframe
          width="480"
          height="270"
          src={`//www.youtube.com/embed/${query.video}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Video>
      <List
        width={600}
        height={500}
        rowCount={commentDetail.length}
        rowHeight={50}
        rowRenderer={rowComment}
        style={{
          border: '2px solid rgba(0, 0, 0, 0.05)',
        }}
      />
    </VideoCommentBlock>
  );
};

export default React.memo(Watch);
