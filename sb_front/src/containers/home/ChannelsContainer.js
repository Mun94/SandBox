import React, { useEffect, useState, useRef, useCallback } from 'react';
import { uploadChannels } from '../../modules/homeChannels.js';
import { useDispatch, useSelector } from 'react-redux';
import Channels from '../../components/home/Channels.js';
import LoadingScreen from '../../components/common/LoadingScreen.js';
import { channelsDatas } from '../../modules/channelsData.js';

const ChannelsContainer = () => {
  const [useChannelInfo, setChannelInfo] = useState([]);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const dispatch = useDispatch();
  const {
    channels,
    loading,
    channelInfo,
    channelsError,
    keyword,
  } = useSelector(({ channelsData, homeChannels, Loading }) => ({
    channels: channelsData.channels,
    channelsError: channelsData.channelsError,
    loading: Loading['channels/CHANNELS'],
    channelInfo: homeChannels.channelInfo,
    keyword: homeChannels.keyword,
  }));

  useEffect(() => {
    dispatch(channelsDatas());
  }, [dispatch]);

  const nextId = useRef(0);

  useEffect(() => {
    if (channels !== null) {
      for (let i = 0; i <= channels.items.length - 1; i++) {
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

      setChannelInfo(useChannelInfo);
      dispatch(uploadChannels({ channelInfo: useChannelInfo }));
    }
  }, [channels, useChannelInfo, dispatch]);

  useEffect(() => {
    if (channelsError) {
      setError(true);
    }
  }, [channelsError]);

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
