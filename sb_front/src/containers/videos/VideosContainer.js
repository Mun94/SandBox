import React, { useEffect, useState, useRef } from 'react';
import { activitiesDatas, videosDatas } from '../../modules/data.js';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  uploadVideoId,
  uploadVideoDetail,
} from '../../modules/videoDetails.js';

const VideosContainer = ({ match }) => {
  const { channelId } = match.params;

  const [useVideoId, setVideoId] = useState([]);
  const [useVideoDetail, setVideoDetail] = useState([]);

  const dispatch = useDispatch();
  const { activities, videoId, videos } = useSelector(
    ({ data, videoDetails }) => ({
      activities: data.activities,
      videos: data.videos,
      videoId: videoDetails.videoId,
    }),
  );

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
    if (videoId !== null) {
      dispatch(videosDatas(videoId.join()));
    }
  }, [activities, useVideoId, dispatch, videoId]);

  const nextId = useRef(0);

  useEffect(() => {
    if (videos !== null) {
      for (let i = 0; i < videos.items.length - 1; i++) {
        const {
          snippet: {
            publishedAt,
            title,
            description,
            thumbnails: { medium },
            tags,
            categoryId,
          },
          contentDetails: { duration },
          statistics: {
            viewCount,
            likeCount,
            dislikeCount,
            favoriteCount,
            commentCount,
          },
        } = videos.items[i];

        useVideoDetail.push({
          id: nextId.current,
          publishedAt,
          title,
          description,
          medium,
          tags,
          categoryId,
          duration,
          viewCount,
          likeCount,
          dislikeCount,
          favoriteCount,
          commentCount,
        });

        nextId.current += 1;
      }
      setVideoDetail(useVideoDetail);
      dispatch(uploadVideoDetail({ videoDetails: useVideoDetail }));
    }
  }, [dispatch, useVideoDetail, videos]);

  return <>adsf</>;
};

export default withRouter(VideosContainer);
