import client from './client.js';
import qs from 'qs';

export const channels = ({ part, id }) => {
  const queryString = qs.stringify({
    part,
    id,
  });
  return client.get(`/channels?${queryString}`);
};

// export const Channels = ({ part, id }) =>
//   client.get(`/channels?part=${part}&id=${id}`);
