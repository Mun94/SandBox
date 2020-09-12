import React, { useEffect, useState } from "react";
import { ActionChannels, UploadChannels } from "../modules/channels.js";
import { useDispatch, useSelector } from "react-redux";
import Home from "../components/Home.js";

const Channels = () => {
  const [creatorId] = useState({
    part: "snippet,statistics",
    id:
      "UChbE5OZQ6dRHECsX0tEPEZQ,UCw-JzmPsjRcbzJLncr4pIIA,UCcdlIcleb4oIK6of1ugSJ7w,UCKkxVSUMRvmvAXMNzjI03Ag,UCGX5sP4ehBkihHwt5bs5wvg",
  });
  const [useSubs, setSubs] = useState([]);
  const [useUrls, setUrls] = useState([]);

  const dispatch = useDispatch();
  const { channels, loading, subs, urls } = useSelector(
    ({ Channels, Loading }) => ({
      channels: Channels.channels,
      loading: Loading["channels/CHANNELS"],
      subs: Channels.upload.subs,
      urls: Channels.upload.profileUrls,
    })
  );

  useEffect(() => {
    dispatch(ActionChannels(creatorId)); // 장삐쭈
  }, [dispatch, creatorId]);

  useEffect(() => {
    async function asyncFunc() {
      if (channels !== null) {
        for (let i = 0; i <= channels.items.length - 1; i++) {
          const {
            statistics: { subscriberCount },
            snippet: {
              thumbnails: {
                default: { url },
              },
            },
          } = await channels.items[i];
          useSubs.push(subscriberCount);
          useUrls.push(url);
        }
        setUrls(useUrls);
        setSubs(useSubs);
      }
    }
    asyncFunc();
  }, [channels, useUrls, useSubs]);

  useEffect(() => {
    dispatch(UploadChannels({ subs: useSubs, profileUrls: useUrls }));
  }, [dispatch, useSubs, useUrls]);

  return (
    <>
      {loading ? (
        <>
          <div>로딩중..</div>
        </>
      ) : (
        subs && urls && <Home subs={[...subs, subs]} urls={urls} />
      )}
    </>
  );
};

export default Channels;
