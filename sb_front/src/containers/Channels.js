import React, { useEffect, useState } from "react";
import { ActionChannels, UploadChannels } from "../modules/channels.js";
import { useDispatch, useSelector } from "react-redux";
import Home from "../components/Home.js";

const Channels = () => {
  const [creatorId] = useState({
    part: "snippet,statistics",
    id:
      "UChbE5OZQ6dRHECsX0tEPEZQ,UCw-JzmPsjRcbzJLncr4pIIA,UCcdlIcleb4oIK6of1ugSJ7w,UCKkxVSUMRvmvAXMNzjI03Ag,UCGX5sP4ehBkihHwt5bs5wvg,UCuq9WVWcsaRqOr3K8E9VkQQ",
  });

  const [useChannelInfo, setChannelInfo] = useState([]);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const { channels, loading, channelInfo, channelsError } = useSelector(
    ({ Channels, Loading }) => ({
      channels: Channels.channels,
      channelsError: Channels.channelsError,
      loading: Loading["channels/CHANNELS"],
      channelInfo: Channels.channelInfo,
    })
  );

  useEffect(() => {
    dispatch(ActionChannels(creatorId));
  }, [dispatch, creatorId]);

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
          id: i,
          subs: subscriberCount,
          profileUrl: url,
          name: title,
        });
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

  return (
    <>
      {loading === false ? (
        <>
          <Home channelInfo={channelInfo} error={error} />
        </>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
};

export default Channels;
