import React, { useEffect, useState, useRef } from 'react';
import { activitiesDatas, videosDatas } from '../../modules/data.js';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  uploadVideoId,
  uploadVideoDetail,
  initialstate,
} from '../../modules/videoDetails.js';
import Videos from '../../components/videos/Videos.js';

const VideosContainer = ({ match }) => {
  const { channelId } = match.params;

  const [useVideoId, setVideoId] = useState([]);
  const [useVideoDetail] = useState([]);

  const dispatch = useDispatch();
  const { activities, videoId, videos, videoDetail } = useSelector(
    ({ data, videoDetails }) => ({
      activities: data.activities,
      videos: data.videos,
      videoId: videoDetails.videoId,
      videoDetail: videoDetails.videoDetail,
    }),
  );

  useEffect(() => {
    dispatch(activitiesDatas(channelId));
  }, [dispatch, channelId]);

  useEffect(() => {
    if (activities !== null) {
      for (let i = 0; i < activities.items.length; i++) {
        const { contentDetails } = activities.items[i];
        if (contentDetails.upload !== undefined) {
          useVideoId.push(contentDetails.upload.videoId);
        }
      }
      setVideoId(useVideoId);
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
    }
  }, [dispatch, useVideoDetail, videos]);

  useEffect(() => {
    dispatch(uploadVideoId({ videoId: useVideoId }));
    dispatch(uploadVideoDetail(useVideoDetail));
    return () => {
      dispatch(initialstate());
    };
  }, [dispatch, useVideoId, useVideoDetail, videoDetail]);

  return (
    <>
      {videoDetail.length < 1 ? (
        <>로딩</>
      ) : (
        <Videos videoDetail={videoDetail} />
      )}
    </>
  );
};

export default withRouter(VideosContainer);
