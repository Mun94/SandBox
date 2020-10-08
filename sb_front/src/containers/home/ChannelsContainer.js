import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  uploadChannels,
  initialstateChannels,
} from '../../modules/homeChannels.js';
import { useDispatch, useSelector } from 'react-redux';
import Channels from '../../components/home/Channels.js';
import LoadingScreen from '../../components/common/LoadingScreen.js';
import { channelsDatas } from '../../modules/youtube.js';
import { dbGet } from '../../modules/dbs.js';
import { initialstateVideoDetails } from '../../modules/videoDetails.js';

const ChannelsContainer = () => {
  const [useChannelInfo] = useState([]);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [useChannelsId] = useState([]);

  const dispatch = useDispatch();
  const {
    channels,
    loading,
    channelInfo,
    apiError,
    keyword,
    dbChannel,
    category,
    dbsLoading,
  } = useSelector(({ youtube, homeChannels, dbs, Loading }) => ({
    channels: youtube.channels,
    apiError: youtube.apiError,
    loading: Loading['youtube/CHANNELS'],
    dbsLoading: Loading['dbs/DBGET'],
    channelInfo: homeChannels.channelInfo,
    keyword: homeChannels.keyword,
    dbChannel: dbs.dbChannel,
    category: homeChannels.category,
  }));

  useEffect(() => {
    dispatch(dbGet());
    return () => {
      dispatch(initialstateVideoDetails());
    };
  }, [dispatch]);

  useEffect(() => {
    if (dbChannel !== null) {
      for (let i = 0; i < dbChannel.length; i++) {
        useChannelsId.push(dbChannel[i].channelId);
      }
      dispatch(channelsDatas(useChannelsId.join()));
    }
    return () => {
      dispatch(initialstateChannels());
    };
  }, [dbChannel, useChannelsId, dispatch]);

  const nextId = useRef(0);

  useEffect(() => {
    if (apiError) {
      setError(true);
    }
    if (channels !== null) {
      for (let i = 0; i < channels.items.length; i++) {
        const {
          statistics: { subscriberCount, videoCount },
          snippet: {
            title,
            description,
            publishedAt,
            thumbnails: {
              default: { url },
            },
          },
          id,
        } = channels.items[i];

        useChannelInfo.push({
          id: nextId.current,
          name: title,
          channelId: id,
          subs: subscriberCount,
          profileUrl: url,
          videoCount,
          description,
          publishedAt,
        });
        nextId.current += 1;
      }
      dispatch(uploadChannels({ channelInfo: useChannelInfo }));
    }
  }, [channels, useChannelInfo, dispatch, apiError]);

  useEffect(() => {
    if (dbChannel !== null && channelInfo.length > 1) {
      for (let i = 0; i < dbChannel.length; i++) {
        for (let j = 0; j < channelInfo.length; j++) {
          if (dbChannel[i].channelId === channelInfo[j].channelId) {
            channelInfo[j].category = dbChannel[i].categoryId;
          }
        }
      }
    }
  }, [dbChannel, channelInfo]);

  const onChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  return (
    <>
      {loading === false && dbsLoading === false ? (
        <Channels
          dbChannel={dbChannel}
          channelInfo={channelInfo}
          error={error}
          sortBy={sortBy}
          onChange={onChange}
          keyword={keyword}
          category={category}
        />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default ChannelsContainer;
