import { db } from './client.js';

export const dbGet = () => db.get('/api/users');

export const dbPatch = ({ videoCount, channelId }) =>
  db.patch(`/api/users/${channelId}`, { videoCount });

export const dbPut = ({ channelId, name, videoCount, categoryId }) =>
  db.put(`/api/users`, { channelId, name, videoCount, categoryId });
