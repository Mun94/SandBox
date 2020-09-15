import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ActionChannels, UploadChannels } from '../../modules/channels.js';
import { useDispatch, useSelector } from 'react-redux';
import Channels from '../../components/home/Channels.js';
import LoadingScreen from '../../components/common/LoadingScreen.js';
import Header from '../../components/common/Header.js';

const ChannelsContainer = () => {
  const [creatorId] = useState({
    part: 'snippet,statistics',
    id:
      'UChbE5OZQ6dRHECsX0tEPEZQ,UCw-JzmPsjRcbzJLncr4pIIA,UCcdlIcleb4oIK6of1ugSJ7w,UCKkxVSUMRvmvAXMNzjI03Ag,UCGX5sP4ehBkihHwt5bs5wvg,UCuq9WVWcsaRqOr3K8E9VkQQ',
  });

  const [useChannelInfo, setChannelInfo] = useState([]);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const dispatch = useDispatch();
  const { channels, loading, channelInfo, channelsError } = useSelector(
    ({ Channels, Loading }) => ({
      channels: Channels.channels,
      channelsError: Channels.channelsError,
      loading: Loading['channels/CHANNELS'],
      channelInfo: Channels.channelInfo,
    }),
  );

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
        <>
          <Header />
          <Channels
            channelInfo={channelInfo}
            error={error}
            sortBy={sortBy}
            onChange={onChange}
          />
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default React.memo(ChannelsContainer);
