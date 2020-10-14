import { createAction, handleActions } from 'redux-actions';

const UPLOAD_CHANNELS_INFO = 'homeChannels/UPLOAD_CHANNELS_INFO';
const SEARCH_KEYWORD = 'homeChannels/SEARCH_KEYWORD';
const CATEGORY_KEY = 'homeChannels/CATEGORY_KEY';
const INITIALSTATE = 'homeChannels/INITIALSTATE';

export const uploadChannels = createAction(
  UPLOAD_CHANNELS_INFO,
  (channelInfo) => channelInfo,
);
export const searchChannels = createAction(
  SEARCH_KEYWORD,
  (keyword) => keyword,
);
export const categoryKeyChannels = createAction(
  CATEGORY_KEY,
  (category) => category,
);
export const initialstateChannels = createAction(INITIALSTATE);

const initialState = {
  channelInfo: [],
  keyword: '',
  category: '',
};

const homeChannels = handleActions(
  {
    [UPLOAD_CHANNELS_INFO]: (state, { payload: { channelInfo } }) => ({
      ...state,
      channelInfo,
    }),
    [SEARCH_KEYWORD]: (state, { payload: { keyword } }) => ({
      ...state,
      keyword,
    }),
    [CATEGORY_KEY]: (state, { payload: { category } }) => ({
      ...state,
      category,
    }),
    [INITIALSTATE]: () => initialState
  },
  initialState,
);

export default homeChannels;
