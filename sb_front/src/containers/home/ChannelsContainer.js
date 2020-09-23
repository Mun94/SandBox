import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  uploadChannels,
  initialstateChannels,
} from '../../modules/homeChannels.js';
import { useDispatch, useSelector } from 'react-redux';
import Channels from '../../components/home/Channels.js';
import LoadingScreen from '../../components/common/LoadingScreen.js';
import { channelsDatas, initialstate } from '../../modules/youtube.js';
import { dbGet } from '../../modules/dbs.js';

const ChannelsContainer = () => {
  const [useChannelInfo, setChannelInfo] = useState([]);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const dispatch = useDispatch();
  const {
    channels,
    loading,
    channelInfo,
    apiError,
    keyword,
    dbChannel,
    category,
  } = useSelector(({ youtube, homeChannels, dbs, Loading }) => ({
    channels: youtube.channels,
    apiError: youtube.apiError,
    loading: Loading['youtube/CHANNELS'],
    channelInfo: homeChannels.channelInfo,
    keyword: homeChannels.keyword,
    dbChannel: dbs.dbChannel,
    category: homeChannels.category,
  }));

  useEffect(() => {
    dispatch(channelsDatas());
    dispatch(dbGet());
    return () => {
      dispatch(initialstate());
    };
  }, [dispatch]);

  const nextId = useRef(0);

  useEffect(() => {
    if (channels !== null) {
      for (let i = 0; i <= channels.items.length - 1; i++) {
        const {
          statistics: { subscriberCount, videoCount },
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
          name: title,
          channelId: id,
          subs: subscriberCount,
          profileUrl: url,
          videoCount,
        });
        nextId.current += 1;
      }
      dispatch(uploadChannels({ channelInfo: useChannelInfo }));
      setChannelInfo(useChannelInfo);
      dispatch(initialstateChannels());
    }
  }, [channels, useChannelInfo, dispatch]);

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
