import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createReactSaga, {
  createReactSagaType,
} from '../lib/createReactSaga.js';
import * as YouTube from '../lib/api/Youtube.js';

const INITIALSTATE = 'homeChannels/INITIALSTATE';

const [CHANNELS, CHANNELS_SUCCESS, CHANNELS_FAILURE] = createReactSagaType(
  'youtube/CHANNELS',
);

const [
  ACTIVITIES,
  ACTIVITIES_SUCCESS,
  ACTIVITIES_FAILURE,
] = createReactSagaType('youtube/ACTIVITIES');

const [VIDEOS, VIDEOS_SUCCESS, VIDEOS_FAILURE] = createReactSagaType(
  'youtube/VIDEOS',
);

export const channelsDatas = createAction(CHANNELS, () => ({
  part: 'snippet,statistics',
  id:
    'UChbE5OZQ6dRHECsX0tEPEZQ,UCw-JzmPsjRcbzJLncr4pIIA,UCcdlIcleb4oIK6of1ugSJ7w,UCKkxVSUMRvmvAXMNzjI03Ag,UCGX5sP4ehBkihHwt5bs5wvg,UCuq9WVWcsaRqOr3K8E9VkQQ,UCN5oT4zGJX-_H6pE5isAEeg,UCuh6Br1vzgo1LivYgKvno5Q,UCom6YhUY62jM52nIMjf5_dw,UCgWwo8FJL3MCxfd66ip7nFg,UCyHvSKT_bLDYpkv1JjjsLAg,UCZ0bi2aVJngKLwFTU5g_fLQ,UCdtV_sB8WUWo-P_q3OwNfcw,UCAGUSx1hbPKDqzBZH7bTjiA,UCM9m5BHwm-lU7tK07co3ClA,UCaHGOzOyeYzLQeKsVkfLEGA,UCtJpqaQ0XAmX5uYZ48crOdQ,UCW945UjEs6Jm3rVNvPEALdg,UCHw9p667e9l0qoYfY8calaA,UCHxrU6bjWrnBfmReUAeztcw',
}));

export const activitiesDatas = createAction(ACTIVITIES, (channelId) => ({
  part: 'snippet,contentDetails',
  channelId,
  maxResults: '12',
}));

export const videosDatas = createAction(VIDEOS, (id) => ({
  part: 'snippet,contentDetails, statistics, player',
  id,
}));
export const initialstate = createAction(INITIALSTATE);

const channelsSaga = createReactSaga(CHANNELS, YouTube.channels);
const activitiesSaga = createReactSaga(ACTIVITIES, YouTube.activities);
const videosSaga = createReactSaga(VIDEOS, YouTube.videos);

export function* sagaChannels() {
  yield takeLatest(CHANNELS, channelsSaga);
  yield takeLatest(ACTIVITIES, activitiesSaga);
  yield takeLatest(VIDEOS, videosSaga);
}

const initialState = {
  channels: null,
  activities: null,
  videos: null,
  apiError: null,
};

const youtube = handleActions(
  {
    [CHANNELS_SUCCESS]: (state, action) => ({
      ...state,
      channels: action.payload,
      apiError: null,
    }),
    [CHANNELS_FAILURE]: (state, action) => ({
      ...state,
      apiError: action.payload,
    }),
    [ACTIVITIES_SUCCESS]: (state, action) => ({
      ...state,
      activities: action.payload,
      apiError: null,
    }),
    [ACTIVITIES_FAILURE]: (state, action) => ({
      ...state,
      apiError: action.payload,
    }),
    [VIDEOS_SUCCESS]: (state, action) => ({
      ...state,
      videos: action.payload,
      apiError: null,
    }),
    [VIDEOS_FAILURE]: (state, action) => ({
      ...state,
      apiError: action.payload,
    }),
    [INITIALSTATE]: () => initialState,
  },
  initialState,
);

export default youtube;
