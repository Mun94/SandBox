import { createAction, handleActions } from 'redux-actions';

const VIDEOID = 'videoDetails/VIDEOID';
const VIDEODETAIL = 'videosDetails/VIDEODETAIL';
const INITIALSTATE = 'videoDetails/INITIALSTATE';

export const uploadVideoId = createAction(VIDEOID, (videoId) => videoId);
export const uploadVideoDetail = createAction(VIDEODETAIL, (videoDetail) => ({
  videoDetail,
}));
export const initialstateVideoDetails = createAction(INITIALSTATE);

const initialState = {
  videoId: [],
  videoDetail: [],
};

const videoDetails = handleActions(
  {
    [VIDEOID]: (state, { payload: { videoId } }) => ({
      ...state,
      videoId,
    }),
    [VIDEODETAIL]: (state, { payload: { videoDetail } }) => ({
      ...state,
      videoDetail,
    }),
    [INITIALSTATE]: () => initialState,
  },
  initialState,
);

export default videoDetails;
