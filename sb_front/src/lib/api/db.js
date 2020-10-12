import { db } from './client.js';

export const dbGet = () => db.get('/api/users');

export const dbPatch = ({ videoCount, channelId }) =>
  db.patch(`/api/users/${channelId}`, { videoCount });

export const dbPost = ({ channelId, name, videoCount, categoryId }) =>
  db.post(`/api/users`, { channelId, name, videoCount, categoryId });

export const dbDelete = ({channelId}) => db.delete(`/api/users/${channelId}`)