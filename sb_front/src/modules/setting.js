import { createAction, handleActions } from 'redux-actions';

const SETTING = 'setting/SETTING';
const SETTINGINITIAL = 'setting/SETTINGINITIAL';
const REMOVEBUTTON = 'setting/REMOVEBUTTON';

export const settingChannel = createAction(SETTING, ({ key, value }) => ({
  key,
  value,
  videoCount: '0',
}));
export const settingInitial = createAction(SETTINGINITIAL);
export const settingRemoveButton = createAction(REMOVEBUTTON, (removeButtonState) => (removeButtonState));

const initialState = {
  channelId: '',
  name: '',
  categoryId: '',
  videoCount: '',
  removeButtonState:null
};

const setting = handleActions(
  {
    [SETTING]: (state, { payload: { key, value, videoCount } }) => ({
      ...state,
      [key]: value,
      videoCount,
    }),
    [REMOVEBUTTON]:(state, {payload:{removeButtonState}}) => ({
      ...state,
      removeButtonState
    }),
    [SETTINGINITIAL]: () => initialState,
  },
  initialState,
);

export default setting;
