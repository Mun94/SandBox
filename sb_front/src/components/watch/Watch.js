import React, { useCallback } from 'react';
import styled from 'styled-components';
import { List } from 'react-virtualized';
import SearchCommentContainer from '../../containers/watch/SearchCommentContainer.js';
import AskModalContainer from '../../containers/watch/AskModalContainer.js';
import { AiTwotoneLike } from 'react-icons/ai';
import Button from '../common/Button.js';
import MoreComment from '../watch/MoreComment.js';

const VideoCommentBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  button + button {
    margin-left: 0.3rem;
  }
  button:focus,
  button:hover {
    background: #ffc200;
  }
`;

const Video = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
  @media (max-width: 1104px) {
    margin-bottom: 1rem;
  }
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
const SearchList = styled.div`
  margin-left: 1.5rem;
`;

const SearchBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  select {
    margin-right: 20px;
    background: #f7f2f2;
    border-radius: 3px;

    &:focus {
      outline: none;
    }
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

const ListBlock = styled.div`
  position: relative;
  .length {
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
  }
`;

const Watch = ({
  query,
  videoDetail,
  commentDetail,
  keyword,
  onChange,
  useSearch,
  onClick,
  onMore,
  useSortBy,
  useMore,
  onMoreCancle,
}) => {
  if (useSortBy === 'likeCount') {
    commentDetail.sort((a, b) => {
      if (parseInt(a.likeCount) > parseInt(b.likeCount)) return -1;
      else if (parseInt(b.likeCount) > parseInt(a.likeCount)) return 1;
      else return 0;
    });
  } else if (useSortBy === 'authorDisplayName') {
    commentDetail.sort((a, b) => {
      if (a.authorDisplayName > b.authorDisplayName) return 1;
      else if (b.authorDisplayName > a.authorDisplayName) return -1;
      else return 0;
    });
  } else {
    commentDetail.sort((a, b) => {
      if (a.publishedAt > b.publishedAt) return -1;
      else if (b.publishedAt > a.publishedAt) return 1;
      else return 0;
    });
  }
  if (keyword) {
    commentDetail = commentDetail.filter(
      (com) => com[useSearch].indexOf(keyword) >= 0,
    );
  }

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
              {comment.textOriginal.length > 50 ? (
                <>
                  {comment.textOriginal.slice(0, 50)}...
                  <Button onClick={onMore} value={comment.id}>
                    더 보기
                  </Button>
                </>
              ) : (
                <>
                  {comment.textOriginal.slice(
                    0,
                    comment.textOriginal.indexOf(keyword),
                  )}
                  <span style={{ color: '#ffc200' }}>
                    {comment.textOriginal.slice(
                      comment.textOriginal.indexOf(keyword),
                      comment.textOriginal.indexOf(keyword) + keyword.length,
                    )}
                  </span>
                  {comment.textOriginal.slice(
                    comment.textOriginal.indexOf(keyword) + keyword.length,
                    comment.textOriginal.length,
                  )}
                </>
              )}
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
    [commentDetail, onMore, keyword],
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
      <SearchList>
        <SearchBlock>
          <select onChange={onChange}>
            <option value="textOriginal">내용</option>
            <option value="authorDisplayName">작성자</option>
          </select>
          <SearchCommentContainer />
        </SearchBlock>
        <ButtonBlock>
          <div>
            <Button onClick={onClick} value="authorDisplayName">
              이름 순
            </Button>
            <Button onClick={onClick} value="likeCount">
              좋아요 순
            </Button>
            <Button onClick={onClick} value="publishedAt">
              최신 순
            </Button>
          </div>
          <div onClick={onMoreCancle}>
            <AskModalContainer />
          </div>
        </ButtonBlock>
        <ListBlock>
          <span className="length">{commentDetail.length + '/100'}</span>
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
          {useMore && (
            <MoreComment
              useMore={useMore}
              commentDetail={commentDetail}
              onMoreCancle={onMoreCancle}
            />
          )}
        </ListBlock>
      </SearchList>
    </VideoCommentBlock>
  );
};

export default React.memo(Watch);
