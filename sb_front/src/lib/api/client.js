import axios from 'axios';
import * as api from './api.js';

export const client = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  params: {
    key: api.YOUTUBE,
  },
});

export const db = axios.create();
