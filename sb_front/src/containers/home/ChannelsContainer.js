import React, { useEffect, useState, useRef, useCallback } from 'react';
import { uploadChannels } from '../../modules/homeChannels.js';
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
  const { channels, loading, channelInfo, apiError, keyword } = useSelector(
    ({ youtube, homeChannels, Loading }) => ({
      channels: youtube.channels,
      apiError: youtube.apiError,
      loading: Loading['youtube/CHANNELS'],
      channelInfo: homeChannels.channelInfo,
      keyword: homeChannels.keyword,
    }),
  );

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

      setChannelInfo(useChannelInfo);
    }
  }, [channels, useChannelInfo, dispatch]);

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
