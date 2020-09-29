import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  uploadChannels,
  initialstateChannels,
} from '../../modules/homeChannels.js';
import { useDispatch, useSelector } from 'react-redux';
import Channels from '../../components/home/Channels.js';
import LoadingScreen from '../../components/common/LoadingScreen.js';
import { channelsDatas, initialstate } from '../../modules/youtube.js';
import { dbGet, initialstateDbs } from '../../modules/dbs.js';
import { initialstateVideoDetails } from '../../modules/videoDetails.js';
import { RiGamepadFill } from 'react-icons/ri';
import { FaSmile, FaTelegramPlane } from 'react-icons/fa';
import { MdMovieCreation } from 'react-icons/md';
import { IoIosBook } from 'react-icons/io';

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
      dispatch(initialstateVideoDetails());
      dispatch(initialstate());
      dispatch(initialstateDbs());
    };
  }, [dispatch]);

  const nextId = useRef(0);

  useEffect(() => {
    if (channels !== null) {
      for (let i = 0; i < channels.items.length; i++) {
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
    if (dbChannel !== null && channelInfo.length > 1) {
      for (let i = 0; i < dbChannel.length; i++) {
        for (let j = 0; j < channelInfo.length; j++) {
          if (dbChannel[i].channelId === channelInfo[j].channelId) {
            channelInfo[j].category = dbChannel[i].categoryId;
            const categoryIcon = {
              코미디: <FaSmile />,
              게임: <RiGamepadFill />,
              영화: <MdMovieCreation />,
              교육: <IoIosBook />,
              일상: <FaTelegramPlane />,
              '일상,게임': (
                <>
                  <FaTelegramPlane />
                  <RiGamepadFill />
                </>
              ),
              '교육,게임': (
                <>
                  <IoIosBook />
                  <RiGamepadFill />
                </>
              ),
            };
            channelInfo[j].Icon = categoryIcon[channelInfo[j].category];
          }
        }
      }
    }
  }, [dbChannel, channelInfo]);

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
