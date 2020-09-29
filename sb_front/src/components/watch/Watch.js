import React, { useCallback } from 'react';
import styled from 'styled-components';
import { List } from 'react-virtualized';
import SearchCommentContainer from '../../containers/watch/SearchCommentContainer.js';
import AskModalContainer from '../../containers/watch/AskModalContainer.js';
import Button from '../common/Button.js';
import MoreComment from '../watch/MoreComment.js';
import { Link } from 'react-router-dom';

import { AiTwotoneLike, AiTwotoneDislike } from 'react-icons/ai';

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
  margin-left: 2rem;
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

const VideoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  margin-right: 2rem;
  @media (max-width: 1104px) {
    margin: 2rem;
    margin-right: 0;
  }
`;

const Title = styled.div`
  margin: 1rem 0;
  div:nth-child(1) {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
  }
  div:nth-child(2) {
    font-size: 0.8rem;
    opacity: 70%;
    margin: 0 0.3rem;
  }
`;

const ViewLikeCount = styled.div`
  display: flex;
  justify-content: space-between;
  opacity: 70%;
  div:nth-child(1) {
    span + span:before {
      content: '\\B7';
      margin: 0 0.1rem;
    }
  }
  div:nth-child(2) {
    span + span {
      margin-left: 1rem;
    }
  }
`;

const Div = styled.div`
  border-bottom: 1px solid gray;
  margin: 1rem 0;
`;

const ProfileBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  div:nth-child(1):hover {
    background: #ffc200;
    border-radius: 4px;
  }
  a {
    margin-right: 0.5rem;
  }
`;

const ProfileImg = styled.img`
  border-radius: 60%;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 1rem;
`;

const DescriptionTags = styled.div``;

const Watch = ({
  query,
  videoDetail,
  channelInfo,
  commentDetail,
  keyword,
  onChange,
  useSearch,
  onClick,
  onMore,
  useSortBy,
  useMore,
  onMoreCancle,
  useVideoDescription,
  onMoreVideoDescription,
  onMoreCancleVideoDescription,
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
      <VideoBlock>
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
        <Title>
          <div>{videoDetail.title}</div>
          <div>
            {videoDetail.tags.map((tag, index) => (
              <span key={index}>
                {tag}
                {', '}
              </span>
            ))}
          </div>
        </Title>
        <ViewLikeCount>
          <div>
            <span>조회수 {videoDetail.viewCount}회</span>
            <span>{videoDetail.publishedAt.split('T')[0]}</span>
          </div>
          <div>
            <span>
              <AiTwotoneLike /> {videoDetail.likeCount}
            </span>
            <span>
              <AiTwotoneDislike /> {videoDetail.dislikeCount}
            </span>
          </div>
        </ViewLikeCount>
        <Div />
        {channelInfo.map(
          (ch) =>
            ch.channelId === videoDetail.channelId && (
              <ProfileBlock key={ch.id}>
                <ProfileImg src={ch.profileUrl} alt="" />
                <Link to={`/v/${ch.channelId}`}>
                  <div>{ch.name}</div>
                </Link>
                <div>{ch.subs / 10000}만명</div>
              </ProfileBlock>
            ),
        )}
        <DescriptionTags>
          {useVideoDescription ? (
            <>
              {videoDetail.description}
              <Button onClick={onMoreCancleVideoDescription}>최소화</Button>
            </>
          ) : (
            <>
              {videoDetail.description.slice(0, 50)}...
              <Button onClick={onMoreVideoDescription}>더 보기</Button>
            </>
          )}
        </DescriptionTags>
      </VideoBlock>

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
