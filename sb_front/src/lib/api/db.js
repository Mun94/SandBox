import { db } from './client.js';

export const dbGet = () => db.get('/api/users');

export const dbPatch = ({ videoCount, channelId }) =>
  db.patch(`/api/users/${channelId}`, { videoCount });
