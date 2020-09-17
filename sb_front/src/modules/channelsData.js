import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createReactSaga, {
  createReactSagaType,
} from '../lib/createReactSaga.js';
import * as YouTube from '../lib/api/Youtube.js';

const [CHANNELS, CHANNELS_SUCCESS, CHANNELS_FAILURE] = createReactSagaType(
  'channels/CHANNELS',
);

export const channelsDatas = createAction(
  CHANNELS,
  (
    part = 'snippet,statistics',
    id = 'UChbE5OZQ6dRHECsX0tEPEZQ,UCw-JzmPsjRcbzJLncr4pIIA,UCcdlIcleb4oIK6of1ugSJ7w,UCKkxVSUMRvmvAXMNzjI03Ag,UCGX5sP4ehBkihHwt5bs5wvg,UCuq9WVWcsaRqOr3K8E9VkQQ,UCN5oT4zGJX-_H6pE5isAEeg,UCuh6Br1vzgo1LivYgKvno5Q,UCom6YhUY62jM52nIMjf5_dw,UCgWwo8FJL3MCxfd66ip7nFg,UCyHvSKT_bLDYpkv1JjjsLAg,UCZ0bi2aVJngKLwFTU5g_fLQ,UCdtV_sB8WUWo-P_q3OwNfcw,UCAGUSx1hbPKDqzBZH7bTjiA,UCM9m5BHwm-lU7tK07co3ClA,UCaHGOzOyeYzLQeKsVkfLEGA,UCtJpqaQ0XAmX5uYZ48crOdQ,UCW945UjEs6Jm3rVNvPEALdg,UCHw9p667e9l0qoYfY8calaA,UCHxrU6bjWrnBfmReUAeztcw',
  ) => ({
    part,
    id,
  }),
);

const channelsSaga = createReactSaga(CHANNELS, YouTube.channels);
export function* sagaChannels() {
  yield takeLatest(CHANNELS, channelsSaga);
}

const initialState = {
  channels: null,
  channelsError: null,
};

const channelsData = handleActions(
  {
    [CHANNELS_SUCCESS]: (state, action) => ({
      ...state,
      channels: action.payload,
    }),
    [CHANNELS_FAILURE]: (state, action) => ({
      ...state,
      channelsError: action.payload,
    }),
  },
  initialState,
);

export default channelsData;
