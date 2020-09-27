import { createAction, handleActions } from 'redux-actions';

const COMMENT = 'watchDetails/COMMENT';
const SEARCHCOMMENT = 'watchDetails/SEARCHCOMMENT';
const RANDOM = 'watchDetails/RANDOM';
const INITIALSTATE = 'watchDetails/INITIALSTATE';

export const uploadComment = createAction(
  COMMENT,
  (commentDetail) => commentDetail,
);
export const searchComment = createAction(SEARCHCOMMENT, (keyword) => keyword);
export const randomCount = createAction(RANDOM, (random) => random);
export const initialstateComment = createAction(INITIALSTATE);

const initialState = {
  commentDetail: [],
  keyword: '',
  random: '',
};

const watchDetails = handleActions(
  {
    [COMMENT]: (state, { payload: { commentDetail } }) => ({
      ...state,
      commentDetail,
    }),
    [SEARCHCOMMENT]: (state, { payload: { keyword } }) => ({
      ...state,
      keyword,
    }),
    [RANDOM]: (state, { payload: { random } }) => ({
      ...state,
      random,
    }),
    [INITIALSTATE]: () => initialState,
  },
  initialState,
);

export default watchDetails;
