import { createAction, handleActions } from 'redux-actions';

const VIDEOID = 'videoDetails/VIDEOID';
const VIDEODETAIL = 'videosDetails/VIDEODETAIL';

export const uploadVideoId = createAction(VIDEOID, (videoId) => videoId);
export const uploadVideoDetail = createAction(VIDEODETAIL, (videoDetail) => ({
  videoDetail,
}));

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
  },
  initialState,
);

export default videoDetails;
