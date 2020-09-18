import { createAction, handleActions } from 'redux-actions';

const VIDEOID = 'videoDetails/VIDEOID';

export const uploadVideoId = createAction(VIDEOID, (videoId) => videoId);

const initialState = {
  videoId: [],
};

const videoDetails = handleActions(
  {
    [VIDEOID]: (state, { payload: { videoId } }) => ({
      ...state,
      videoId,
    }),
  },
  initialState,
);

export default videoDetails;
