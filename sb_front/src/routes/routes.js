// app.js
const HOME = '/';
const VIDEOS = '/v/:channelId';
const WATCH = '/watch';
const CHANNELINFO = '/info/:channelId';

const routes = {
  home: HOME,
  videos: (channelId) => {
    if (channelId) {
      return `/v/${channelId}`;
    } else {
      return VIDEOS;
    }
  },
  watch: WATCH,
  channelInfo: (channelId) => {
    if (channelId) {
      return `/v/${channelId}`;
    } else {
      return CHANNELINFO;
    }
  },
};

export default routes;
