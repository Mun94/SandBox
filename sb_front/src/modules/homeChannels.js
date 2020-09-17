import { createAction, handleActions } from 'redux-actions';

const UPLOAD_CHANNELS_INFO = 'channels/UPLOAD_CHANNELS_INFO';
const SEARCH_KEYWORD = 'channels/SEARCH_KEYWORD';

export const uploadChannels = createAction(
  UPLOAD_CHANNELS_INFO,
  ({ channelInfo }) => ({ channelInfo }),
);
export const searchChannels = createAction(SEARCH_KEYWORD, ({ keyword }) => ({
  keyword,
}));

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
  },
  initialState,
);

export default homeChannels;
