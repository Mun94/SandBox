import React, { useEffect, useState } from 'react';
import { activitiesDatas } from '../../modules/data.js';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { uploadVideoId } from '../../modules/videoDetails.js';

const VideosContainer = ({ match }) => {
  const { channelId } = match.params;

  const [useVideoId, setVideoId] = useState([]);

  const dispatch = useDispatch();
  const { activities } = useSelector(({ data }) => ({
    activities: data.activities,
  }));

  useEffect(() => {
    dispatch(activitiesDatas(channelId));
  }, [dispatch, channelId]);

  useEffect(() => {
    if (activities !== null) {
      for (let i = 0; i < activities.items.length - 1; i++) {
        const { contentDetails } = activities.items[i];
        if (contentDetails.upload !== undefined) {
          useVideoId.push(contentDetails.upload.videoId);
        }
      }
      setVideoId(useVideoId);
      dispatch(uploadVideoId({ videoId: useVideoId }));
    }
  }, [activities, useVideoId, dispatch]);

  return <>adsf</>;
};

export default withRouter(VideosContainer);
