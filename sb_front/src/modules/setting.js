import { createAction, handleActions } from 'redux-actions';

const SETTING = 'setting/SETTING';
const SETTINGINITIAL = 'setting/SETTINGINITIAL';

export const settingChannel = createAction(SETTING, ({ key, value }) => ({
  key,
  value,
  videoCount: '0',
}));
export const settingInitial = createAction(SETTINGINITIAL);

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
    [SETTINGINITIAL]: () => initialState,
  },
  initialState,
);

export default setting;
