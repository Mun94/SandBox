import { combineReducers } from 'redux';
import homeChannels from './homeChannels.js';
import data, { sagaChannels } from './data.js';
import videoDetails from './videoDetails.js';
import { all } from 'redux-saga/effects';
import Loading from './loading.js';

const RootReducer = combineReducers({
  Loading,
  homeChannels,
  data,
  videoDetails,
});

export function* RootSaga() {
  yield all([sagaChannels()]);
}

export default RootReducer;
