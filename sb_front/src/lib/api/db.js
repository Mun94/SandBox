import { db } from './client.js';

export const dbGet = () => {
  db.get('/users');
};

export const dbPatch = ({ videoCount, channelId }) => {
  db.patch(`/users/${channelId}`, videoCount);
};
