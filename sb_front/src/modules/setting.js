import { createAction, handleActions } from 'redux-actions';

const SETTING = 'setting/SETTING';

export const settingChannel = createAction(SETTING, ({ key, value }) => ({
  key,
  value,
  videoCount: '0',
}));

const initialState = {
  channelId: '',
  name: '',
  categoryId: '',
  videoCount: '',
};

const setting = handleActions(
  {
    [SETTING]: (state, { payload: { key, value, videoCount } }) => ({
      ...state,
      [key]: value,
      videoCount,
    }),
  },
  initialState,
);

export default setting;
