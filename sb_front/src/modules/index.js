import { combineReducers } from "redux";
import Channels, { SagaChannels } from "./channels.js";
import { all } from "redux-saga/effects";
import Loading from "./loading.js";

const RootReducer = combineReducers({
  Loading,
  Channels,
});

export function* RootSaga() {
  yield all([SagaChannels()]);
}

export default RootReducer;
