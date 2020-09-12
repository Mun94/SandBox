import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createReactSaga, {
  createReactSagaType,
} from "../lib/createReactSaga.js";
import * as YouTube from "../lib/api/Youtube.js";

const [CHANNELS, CHANNELS_SUCCESS, CHANNELS_FAILURE] = createReactSagaType(
  "channels/CHANNELS"
);
const UPLOAD_CHANNELS_INFO = "channels/UPLOAD_CHANNELS_INFO";

export const ActionChannels = createAction(CHANNELS, ({ part, id }) => ({
  part,
  id,
}));
export const UploadChannels = createAction(
  UPLOAD_CHANNELS_INFO,
  ({ subs, profileUrls }) => ({ subs, profileUrls })
);

const ChannelsSaga = createReactSaga(CHANNELS, YouTube.Channels);
export function* SagaChannels() {
  yield takeLatest(CHANNELS, ChannelsSaga);
}

const initialState = {
  upload: { subs: [], profileUrls: [] },
  channels: null,
  channelsError: null,
};

const Channels = handleActions(
  {
    [CHANNELS_SUCCESS]: (state, action) => ({
      ...state,
      channels: action.payload,
    }),
    [CHANNELS_FAILURE]: (state, action) => ({
      ...state,
      channelsError: action.payload,
    }),
    [UPLOAD_CHANNELS_INFO]: (state, { payload: { subs, profileUrls } }) => ({
      ...state,
      upload: { subs, profileUrls },
    }),
  },
  initialState
);

export default Channels;
