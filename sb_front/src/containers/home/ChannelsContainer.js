import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ActionChannels, UploadChannels } from '../../modules/channels.js';
import { useDispatch, useSelector } from 'react-redux';
import Channels from '../../components/home/Channels.js';
import LoadingScreen from '../../components/common/LoadingScreen.js';

const ChannelsContainer = () => {
  const [creatorId] = useState({
    part: 'snippet,statistics',
    id:
      'UChbE5OZQ6dRHECsX0tEPEZQ,UCw-JzmPsjRcbzJLncr4pIIA,UCcdlIcleb4oIK6of1ugSJ7w,UCKkxVSUMRvmvAXMNzjI03Ag,UCGX5sP4ehBkihHwt5bs5wvg,UCuq9WVWcsaRqOr3K8E9VkQQ,UCN5oT4zGJX-_H6pE5isAEeg,UCuh6Br1vzgo1LivYgKvno5Q,UCom6YhUY62jM52nIMjf5_dw,UCgWwo8FJL3MCxfd66ip7nFg,UCyHvSKT_bLDYpkv1JjjsLAg,UCZ0bi2aVJngKLwFTU5g_fLQ,UCdtV_sB8WUWo-P_q3OwNfcw,UCAGUSx1hbPKDqzBZH7bTjiA,UCM9m5BHwm-lU7tK07co3ClA,UCaHGOzOyeYzLQeKsVkfLEGA,UCtJpqaQ0XAmX5uYZ48crOdQ,UCW945UjEs6Jm3rVNvPEALdg,UCHw9p667e9l0qoYfY8calaA,UCHxrU6bjWrnBfmReUAeztcw',
  });

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
  } = useSelector(({ Channels, Loading }) => ({
    channels: Channels.channels,
    channelsError: Channels.channelsError,
    loading: Loading['channels/CHANNELS'],
    channelInfo: Channels.channelInfo,
    keyword: Channels.keyword,
  }));

  useEffect(() => {
    dispatch(ActionChannels(creatorId));
  }, [dispatch, creatorId]);

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
        } = channels.items[i];

        useChannelInfo.push({
          id: nextId.current,
          subs: subscriberCount,
          profileUrl: url,
          name: title,
        });
        nextId.current += 1;
      }

      setChannelInfo(useChannelInfo);
      dispatch(UploadChannels({ channelInfo: useChannelInfo }));
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
