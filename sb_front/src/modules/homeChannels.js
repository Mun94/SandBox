import { createAction, handleActions } from 'redux-actions';

const UPLOAD_CHANNELS_INFO = 'homeChannels/UPLOAD_CHANNELS_INFO';
const SEARCH_KEYWORD = 'homeChannels/SEARCH_KEYWORD';
const INITIALSTATE = 'homeChannels/INITIALSTATE';

export const uploadChannels = createAction(
  UPLOAD_CHANNELS_INFO,
  ({ channelInfo }) => ({ channelInfo }),
);
export const searchChannels = createAction(SEARCH_KEYWORD, ({ keyword }) => ({
  keyword,
}));
export const initialstate = createAction(INITIALSTATE);

const initialState = {
  channelInfo: [],
  keyword: '',
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
    [INITIALSTATE]: (state) => ({
      ...state,
      keyword: '',
    }),
  },
  initialState,
);

export default homeChannels;
