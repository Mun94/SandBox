import { createAction, handleActions } from 'redux-actions';

const COMMENT = 'watchDetail/COMMENT';
const INITIALSTATE = 'watchDetail/INITIALSTATE';

export const uploadComment = createAction(
  COMMENT,
  (commentDetail) => commentDetail,
);
export const initialstateComment = createAction(INITIALSTATE);

const initialState = {
  commentDetail: [],
};

const watchDetails = handleActions(
  {
    [COMMENT]: (state, { payload: { commentDetail } }) => ({
      ...state,
      commentDetail,
    }),
    [INITIALSTATE]: () => initialState,
  },
  initialState,
);

export default watchDetails;
