import { createAction, handleActions } from 'redux-actions';

const COMMENT = 'watchDetail/COMMENT';

export const uploadComment = createAction(
  COMMENT,
  (commentDetail) => commentDetail,
);

const initialState = {
  commentDetail: [],
};

const watchDetails = handleActions(
  {
    [COMMENT]: (state, { payload: { commentDetail } }) => ({
      ...state,
      commentDetail,
    }),
  },
  initialState,
);

export default watchDetails;
