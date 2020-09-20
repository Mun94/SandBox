import React, { useEffect, useState, useRef, useCallback } from 'react';
import { uploadChannels } from '../../modules/homeChannels.js';
import { useDispatch, useSelector } from 'react-redux';
import Channels from '../../components/home/Channels.js';
import LoadingScreen from '../../components/common/LoadingScreen.js';
import {
  channelsDatas,
  initialstate,
  homeActivitiesDatas,
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
  } = useSelector(({ data, homeChannels, Loading }) => ({
    channels: data.channels,
    apiError: data.apiError,
    loading: Loading['data/CHANNELS'],
    channelInfo: homeChannels.channelInfo,
    keyword: homeChannels.keyword,
    homeActivities: data.homeActivities,
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

  const nextId = useRef(0);
  useEffect(() => {
    if (homeActivities !== null) {
      for (let i = 0; i < homeActivities.items.length; i++) {
        useHomeActivities.push(homeActivities.items[i]);
      }
    }
  }, [homeActivities, useHomeActivities]);

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
          videoId: useHomeActivities.splice(0, 3),
        });

        nextId.current += 1;
      }
    }
  }, [channels, useChannelInfo, dispatch, useHomeActivities]);

  useEffect(() => {
    dispatch(uploadChannels({ channelInfo: useChannelInfo }));
  }, [dispatch, useChannelInfo]);

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
      {loading === false ? (
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
