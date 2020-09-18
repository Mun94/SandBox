import client from './client.js';
import qs from 'qs';

export const channels = ({ part, id }) => {
  const queryString = qs.stringify({
    part,
    id,
  });
  return client.get(`/channels?${queryString}`);
};

export const activities = ({ part, channelId, maxResults }) => {
  const queryString = qs.stringify({
    part,
    channelId,
    maxResults,
  });
  return client.get(`/activities?${queryString}`);
};

export const channelsSections = ({ part, channelId }) => {
  const queryString = qs.stringify({
    part,
    channelId,
  });
  return client.get(`/channelSections?${queryString}`);
};
