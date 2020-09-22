import React, { useEffect, useState, useRef } from 'react';
import { activitiesDatas, videosDatas } from '../../modules/youtube.js';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  uploadVideoId,
  uploadVideoDetail,
  initialstate,
} from '../../modules/videoDetails.js';
import Videos from '../../components/videos/Videos.js';
import { dbPatch } from '../../modules/dbs.js';

const VideosContainer = ({ match }) => {
  const { channelId } = match.params;

  const [useVideoId, setVideoId] = useState([]);
  const [useVideoDetail, setVideoDetail] = useState([]);

  const dispatch = useDispatch();
  const { activities, videoId, videos, videoDetail, channelInfo } = useSelector(
    ({ youtube, videoDetails, homeChannels }) => ({
      activities: youtube.activities,
      videos: youtube.videos,
      videoId: videoDetails.videoId,
      videoDetail: videoDetails.videoDetail,
      channelInfo: homeChannels.channelInfo,
    }),
  );

  useEffect(() => {
    dispatch(activitiesDatas(channelId));
    for (let i = 0; i < channelInfo.length; i++) {
      if (channelId === channelInfo[i].channelId) {
        dispatch(dbPatch({ channelId, videoCount: channelInfo[i].videoCount }));
      }
    }
  }, [dispatch, channelId, channelInfo]);

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
      setVideoDetail(useVideoDetail);
    }
  }, [dispatch, useVideoDetail, videos]);

  useEffect(() => {
    dispatch(uploadVideoId({ videoId: useVideoId }));
    dispatch(uploadVideoDetail(useVideoDetail));

    return () => {
      dispatch(initialstate());
    };
  }, [dispatch, useVideoId, useVideoDetail]);

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
