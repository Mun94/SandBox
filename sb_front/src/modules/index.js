import { combineReducers } from 'redux';
import homeChannels from './homeChannels.js';
import youtube, { sagaChannels } from './youtube.js';
import dbs, { sagaDb } from './dbs.js';
import videoDetails from './videoDetails.js';
import watchDetails from './watchDetails.js';
import setting from './setting.js';
import { all } from 'redux-saga/effects';
import Loading from './loading.js';

const RootReducer = combineReducers({
  Loading,
  homeChannels,
  youtube,
  dbs,
  videoDetails,
  watchDetails,
  setting,
});

export function* RootSaga() {
  yield all([sagaChannels(), sagaDb()]);
}

export default RootReducer;
