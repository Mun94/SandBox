import React, { useCallback } from 'react';
import styled from 'styled-components';
import { List } from 'react-virtualized';

import { AiTwotoneLike } from 'react-icons/ai';

const VideoCommentBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Video = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
`;

const ComBlock = styled.div`
  display: flex;
`;

const Img = styled.img`
  border-radius: 60%;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const NamePublishedAt = styled.div`
  display: flex;
  margin-bottom: 0.2rem;
  span + span:before {
    content: '\\B7';
    margin: 0 0.1rem;
  }
  span:nth-child(2) {
    opacity: 60%;
  }
`;

const Text = styled.div`
  color: #f7f2f2;
  margin-bottom: 0.2rem;
`;

const LikeCount = styled.div`
  display: flex;
  align-items: center;
  span:nth-child(1) {
    margin-right: 0.5rem;
    opacity: 60%;
  }
`;

const Watch = ({ query, videoDetail, commentDetail }) => {
  const rowComment = useCallback(
    ({ index, key, style }) => {
      const comment = commentDetail[index];

      return (
        <ComBlock key={key} style={style}>
          <Img src={comment.authorProfileImageUrl} alt="" />
          <Content>
            <NamePublishedAt>
              <span>{comment.authorDisplayName}</span>
              <span>{comment.publishedAt.split('T')[0]}</span>
            </NamePublishedAt>
            <Text>
              {comment.textOriginal.length > 50
                ? comment.textOriginal.slice(0, 50) + '...'
                : comment.textOriginal}
            </Text>
            <LikeCount>
              <span>
                <AiTwotoneLike />
              </span>
              {comment.likeCount}
            </LikeCount>
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
        height={600}
        rowCount={commentDetail.length}
        rowHeight={100}
        rowRenderer={rowComment}
        style={{
          border: '2px solid rgba(0, 0, 0, 0.05)',
        }}
      />
    </VideoCommentBlock>
  );
};

export default React.memo(Watch);
