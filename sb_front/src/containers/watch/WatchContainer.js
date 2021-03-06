import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Watch from '../../components/watch/Watch';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { commentThreads } from '../../modules/youtube.js';
import {
  uploadComment,
  initialstateComment,
} from '../../modules/watchDetails.js';
import { initialstate } from '../../modules/youtube.js';
import LoadingSub from '../../components/common/LoadingSub.js';

const WatchContainer = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const [useComment] = useState([]);
  const [useSearch, setSearch] = useState('textOriginal');
  const [useSortBy, setSortBy] = useState('');
  const [useMore, setMore] = useState(null);
  const [useVideoDescription, setVideoDescription] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const {
    videoDetail,
    comment,
    commentDetail,
    keyword,
    channelInfo,
    apiError,
  } = useSelector(({ videoDetails, youtube, watchDetails, homeChannels }) => ({
    videoDetail: videoDetails.videoDetail[parseInt(query.num)],
    comment: youtube.comment,
    commentDetail: watchDetails.commentDetail,
    keyword: watchDetails.keyword,
    channelInfo: homeChannels.channelInfo,
    apiError: youtube.apiError,
  }));

  useEffect(() => {
    dispatch(commentThreads(query.video));
    return () => {
      dispatch(initialstateComment());
    };
  }, [dispatch, query.video]);

  const nextId = useRef(0);

  useEffect(() => {
    if (apiError) {
      setError(true);
    }
    if (comment !== null) {
      for (let i = 0; i < comment.items.length; i++) {
        const {
          snippet: {
            topLevelComment: {
              snippet: {
                textOriginal,
                authorDisplayName,
                authorProfileImageUrl,
                publishedAt,
                likeCount,
              },
            },
          },
        } = comment.items[i];

        useComment.push({
          id: nextId.current,
          textOriginal,
          authorDisplayName,
          authorProfileImageUrl,
          publishedAt,
          likeCount,
        });

        nextId.current += 1;
      }
      dispatch(uploadComment({ commentDetail: useComment }));
      dispatch(initialstate());
    }
  }, [comment, useComment, dispatch, apiError]);

  const onChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);
  const onClick = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);
  const onMore = useCallback((e) => {
    setMore(e.target.value);
  }, []);
  const onMoreCancle = () => {
    setMore(null);
  };
  const onMoreVideoDescription = () => {
    setVideoDescription(true);
  };
  const onMoreCancleVideoDescription = () => {
    setVideoDescription(false);
  };

  return (
    <>
      {commentDetail.length < 1 && videoDetail.length < 1 ? (
        <LoadingSub />
      ) : (
        <Watch
          videoDetail={videoDetail}
          commentDetail={commentDetail}
          query={query}
          keyword={keyword}
          onChange={onChange}
          useSearch={useSearch}
          onClick={onClick}
          useSortBy={useSortBy}
          onMore={onMore}
          useMore={useMore}
          onMoreCancle={onMoreCancle}
          channelInfo={channelInfo}
          onMoreVideoDescription={onMoreVideoDescription}
          useVideoDescription={useVideoDescription}
          onMoreCancleVideoDescription={onMoreCancleVideoDescription}
          error={error}
        />
      )}
    </>
  );
};

export default withRouter(WatchContainer);
