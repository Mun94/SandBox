import { createAction, handleActions } from 'redux-actions';

const SETTING = 'setting/SETTING';
const SETTINGINITIAL = 'setting/SETTINGINITIAL';
const REMOVENAME = 'setting/REMOVENAME';

export const settingChannel = createAction(SETTING, ({ key, value }) => ({
  key,
  value,
  videoCount: '0',
}));
export const settingInitial = createAction(SETTINGINITIAL);
export const settingRemoveName = createAction(REMOVENAME, (removeName) => (removeName));

const initialState = {
  channelId: '',
  name: '',
  categoryId: '',
  videoCount: '',
  removeName:''
};

const setting = handleActions(
  {
    [SETTING]: (state, { payload: { key, value, videoCount } }) => ({
      ...state,
      [key]: value,
      videoCount,
    }),
    [REMOVENAME]:(state, {payload:{removeName}}) => ({
      ...state,
      removeName
    }),
    [SETTINGINITIAL]: () => initialState,
  },
  initialState,
);

export default setting;
