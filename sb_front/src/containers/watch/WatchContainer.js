import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Watch from '../../components/watch/Watch';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { commentThreads } from '../../modules/youtube.js';

const WatchContainer = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const dispatch = useDispatch();
  const { videoDetail } = useSelector(({ videoDetails }) => ({
    videoDetail: videoDetails.videoDetail[parseInt(query.num)],
  }));

  useEffect(() => {
    dispatch(commentThreads(query.video));
  }, [dispatch]);

  return <Watch videoDetail={videoDetail} query={query} />;
};

export default withRouter(WatchContainer);
