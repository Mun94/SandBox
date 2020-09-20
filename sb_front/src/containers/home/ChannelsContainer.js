import React, { useEffect, useState, useRef, useCallback } from 'react';
import { uploadChannels, uploadVideoId } from '../../modules/homeChannels.js';
import { useDispatch, useSelector } from 'react-redux';
import Channels from '../../components/home/Channels.js';
import LoadingScreen from '../../components/common/LoadingScreen.js';
import {
  channelsDatas,
  initialstate,
  homeActivitiesDatas,
  homeVideosDatas,
} from '../../modules/data.js';

const ChannelsContainer = () => {
  const [useChannelInfo] = useState([]);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [useHomeActivities] = useState([]);

  const dispatch = useDispatch();
  const {
    channels,
    loading,
    channelInfo,
    apiError,
    keyword,
    homeActivities,
    videoId,
  } = useSelector(({ data, homeChannels, Loading }) => ({
    channels: data.channels,
    apiError: data.apiError,
    loading: Loading['data/CHANNELS'],
    channelInfo: homeChannels.channelInfo,
    keyword: homeChannels.keyword,
    homeActivities: data.homeActivities,
    videoId: homeChannels.videoId,
  }));

  useEffect(() => {
    dispatch(channelsDatas());
    for (let i = 0; i < 20; i++) {
      dispatch(homeActivitiesDatas(i));
    }
    return () => {
      dispatch(initialstate());
    };
  }, [dispatch]);

  useEffect(() => {
    if (homeActivities !== null) {
      for (let i = 0; i < homeActivities.items.length; i++) {
        const { contentDetails } = homeActivities.items[i];
        if (contentDetails.upload !== undefined) {
          useHomeActivities.push(contentDetails.upload.videoId);
        }
      }
    }
    if (videoId !== null) {
      dispatch(homeVideosDatas(videoId.join()));
    }
  }, [homeActivities, useHomeActivities, dispatch, videoId]);

  const nextId = useRef(0);

  useEffect(() => {
    if (channels !== null) {
      for (let i = 0; i < channels.items.length; i++) {
        const {
          statistics: { subscriberCount },
          snippet: {
            title,
            thumbnails: {
              default: { url },
            },
          },
          id,
        } = channels.items[i];

        useChannelInfo.push({
          id: nextId.current,
          subs: subscriberCount,
          profileUrl: url,
          name: title,
          channelId: id,
        });

        nextId.current += 1;
      }
    }
  }, [channels, useChannelInfo, dispatch]);

  useEffect(() => {
    dispatch(uploadChannels({ channelInfo: useChannelInfo }));
    dispatch(uploadVideoId({ videoId: useHomeActivities }));
    return () => {
      dispatch(initialstate());
    };
  }, [dispatch, useChannelInfo, useHomeActivities]);

  useEffect(() => {
    if (apiError) {
      setError(true);
    }
  }, [apiError]);

  const onChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  return (
    <>
      {loading === false && channelInfo.length === 20 ? (
        <Channels
          channelInfo={channelInfo}
          error={error}
          sortBy={sortBy}
          onChange={onChange}
          keyword={keyword}
        />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default ChannelsContainer;
