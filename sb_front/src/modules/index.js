import { combineReducers } from 'redux';
import homeChannels from './homeChannels.js';
import channelsData, { sagaChannels } from './channelsData.js';
import { all } from 'redux-saga/effects';
import Loading from './loading.js';

const RootReducer = combineReducers({
  Loading,
  homeChannels,
  channelsData,
});

export function* RootSaga() {
  yield all([sagaChannels()]);
}

export default RootReducer;
