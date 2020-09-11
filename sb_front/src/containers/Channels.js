import React, { useEffect, useState } from "react";
import { ActionChannels } from "../modules/channels.js";
import { useDispatch, useSelector } from "react-redux";
import Home from "../components/Home.js";

const Channels = () => {
  const [url, setUrl] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(null);

  const dispatch = useDispatch();
  const { channels, loading } = useSelector(({ Channels, Loading }) => ({
    channels: Channels.channels,
    loading: Loading["channels/CHANNELS"],
  }));

  useEffect(() => {
    dispatch(
      ActionChannels({
        part: "snippet,statistics",
        id: "UChbE5OZQ6dRHECsX0tEPEZQ",
      })
    ); // 장삐쭈
  }, [dispatch]);

  useEffect(() => {
    if (channels !== null) {
      const {
        statistics: { subscriberCount },
        snippet: {
          thumbnails: {
            default: { url },
          },
        },
      } = channels.items[0];

      setSubscriberCount(subscriberCount);
      setUrl(url);
    }
  }, [channels]);

  return (
    <>
      {loading ? (
        <>
          <div>로딩중..</div>
        </>
      ) : (
        <Home thumbnails={url} subscriberCount={subscriberCount} />
      )}
    </>
  );
};

export default Channels;
