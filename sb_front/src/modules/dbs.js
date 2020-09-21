import { createAction, handleActions } from 'redux-actions';
import createReactSaga, {
  createReactSagaType,
} from '../lib/createReactSaga.js';
import * as db from '../lib/api/db.js';
import { takeLatest } from 'redux-saga/effects';

const [DBGET, DBGET_SUCCESS, DBGET_FAIULRE] = createReactSagaType('db/DBGET');
const DBPATCH = 'db/DBPATCH';

export const dbGet = createAction(DBGET);
export const dbPatch = createAction(DBPATCH, ({ channelId, videoCount }) => ({
  channelId,
  videoCount,
}));

const dbGetSaga = createReactSaga(DBGET, db.dbGet);
const dbPatchSaga = createReactSaga(DBPATCH, db.dbPatch);

export function* sagaDb() {
  yield takeLatest(DBGET, dbGetSaga);
  yield takeLatest(DBPATCH, dbPatchSaga);
}

const initialState = {
  dbChannel: null,
  dbError: null,
};

const dbs = handleActions(
  {
    [DBGET_SUCCESS]: (state, action) => ({
      ...state,
      dbChannel: action.payload,
      dbError: null,
    }),
    [DBGET_FAIULRE]: (state, action) => ({
      ...state,
      dbError: action.payload,
    }),
  },
  initialState,
);

export default dbs;
