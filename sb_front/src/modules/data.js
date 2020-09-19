import { createAction, handleActions } from 'redux-actions';
import { takeLatest, takeEvery } from 'redux-saga/effects';
import createReactSaga, {
  createReactSagaType,
} from '../lib/createReactSaga.js';
import * as YouTube from '../lib/api/Youtube.js';

const id =
  'UChbE5OZQ6dRHECsX0tEPEZQ,UCw-JzmPsjRcbzJLncr4pIIA,UCcdlIcleb4oIK6of1ugSJ7w,UCKkxVSUMRvmvAXMNzjI03Ag,UCGX5sP4ehBkihHwt5bs5wvg,UCuq9WVWcsaRqOr3K8E9VkQQ,UCN5oT4zGJX-_H6pE5isAEeg,UCuh6Br1vzgo1LivYgKvno5Q,UCom6YhUY62jM52nIMjf5_dw,UCgWwo8FJL3MCxfd66ip7nFg,UCyHvSKT_bLDYpkv1JjjsLAg,UCZ0bi2aVJngKLwFTU5g_fLQ,UCdtV_sB8WUWo-P_q3OwNfcw,UCAGUSx1hbPKDqzBZH7bTjiA,UCM9m5BHwm-lU7tK07co3ClA,UCaHGOzOyeYzLQeKsVkfLEGA,UCtJpqaQ0XAmX5uYZ48crOdQ,UCW945UjEs6Jm3rVNvPEALdg,UCHw9p667e9l0qoYfY8calaA,UCHxrU6bjWrnBfmReUAeztcw';

const INITIALSTATE = 'homeChannels/INITIALSTATE';

const [CHANNELS, CHANNELS_SUCCESS, CHANNELS_FAILURE] = createReactSagaType(
  'data/CHANNELS',
);

const [
  ACTIVITIES,
  ACTIVITIES_SUCCESS,
  ACTIVITIES_FAILURE,
] = createReactSagaType('data/ACTIVITIES');

const [VIDEOS, VIDEOS_SUCCESS, VIDEOS_FAILURE] = createReactSagaType(
  'data/VIDEOS',
);

const [
  HOME_ACTIVITIES,
  HOME_ACTIVITIES_SUCCESS,
  HOME_ACTIVITIES_FAILURE,
] = createReactSagaType('data/HOME_ACTIVITIES');

export const channelsDatas = createAction(CHANNELS, () => ({
  part: 'snippet,statistics',
  id,
}));

const isArray = id.split(',');

export const homeActivitiesDatas = createAction(HOME_ACTIVITIES, (i) => ({
  part: 'contentDetails',
  channelId: isArray[i],
  maxResults: '3',
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
const homeActivitiesSaga = createReactSaga(HOME_ACTIVITIES, YouTube.activities);
const activitiesSaga = createReactSaga(ACTIVITIES, YouTube.activities);
const videosSaga = createReactSaga(VIDEOS, YouTube.videos);

export function* sagaChannels() {
  yield takeLatest(CHANNELS, channelsSaga);
  yield takeEvery(HOME_ACTIVITIES, homeActivitiesSaga);
  yield takeLatest(ACTIVITIES, activitiesSaga);
  yield takeLatest(VIDEOS, videosSaga);
}

const initialState = {
  channels: null,
  homeActivities: null,
  activities: null,
  videos: null,
  apiError: null,
};

const data = handleActions(
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
    [HOME_ACTIVITIES_SUCCESS]: (state, action) => ({
      ...state,
      homeActivities: action.payload,
      apiError: null,
    }),
    [HOME_ACTIVITIES_FAILURE]: (state, action) => ({
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

export default data;
