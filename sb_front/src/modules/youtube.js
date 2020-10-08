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

const [
  COMMENTTHREADS,
  COMMENTTHREADS_SUCCESS,
  COMMENTTHREADS_FAILURE,
] = createReactSagaType('youtube/COMMENTTHREADS');

export const channelsDatas = createAction(CHANNELS, (id) => ({
  part: 'snippet,statistics',
  id,
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
export const commentThreads = createAction(COMMENTTHREADS, (videoId) => ({
  part: 'snippet',
  maxResults: '100',
  videoId,
}));
export const initialstate = createAction(INITIALSTATE);

const channelsSaga = createReactSaga(CHANNELS, YouTube.channels);
const activitiesSaga = createReactSaga(ACTIVITIES, YouTube.activities);
const videosSaga = createReactSaga(VIDEOS, YouTube.videos);
const commentThreadsSaga = createReactSaga(
  COMMENTTHREADS,
  YouTube.commentThreads,
);

export function* sagaChannels() {
  yield takeLatest(CHANNELS, channelsSaga);
  yield takeLatest(ACTIVITIES, activitiesSaga);
  yield takeLatest(VIDEOS, videosSaga);
  yield takeLatest(COMMENTTHREADS, commentThreadsSaga);
}

const initialState = {
  channels: null,
  activities: null,
  videos: null,
  comment: null,
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
    [COMMENTTHREADS_SUCCESS]: (state, action) => ({
      ...state,
      comment: action.payload,
      apiError: null,
    }),
    [COMMENTTHREADS_FAILURE]: (state, action) => ({
      ...state,
      apiError: action.payload,
    }),
    [INITIALSTATE]: () => initialState,
  },
  initialState,
);

export default youtube;
