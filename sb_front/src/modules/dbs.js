import { createAction, handleActions } from 'redux-actions';
import createReactSaga, {
  createReactSagaType,
} from '../lib/createReactSaga.js';
import * as db from '../lib/api/db.js';
import { takeLatest } from 'redux-saga/effects';

const [DBGET, DBGET_SUCCESS, DBGET_FAILURE] = createReactSagaType('dbs/DBGET');
const DBPATCH = 'dbs/DBPATCH';
const [DBPUT] = 'dbs/DBPUT';

export const dbGet = createAction(DBGET);
export const dbPatch = createAction(DBPATCH, ({ channelId, videoCount }) => ({
  channelId,
  videoCount,
}));
export const dbPut = createAction(DBPUT, ({ channelId, name, categoryId }) => ({
  channelId,
  name,
  videoCount: '0',
  categoryId,
}));

const dbGetSaga = createReactSaga(DBGET, db.dbGet);
const dbPatchSaga = createReactSaga(DBPATCH, db.dbPatch);
const dbPutSaga = createReactSaga(DBPUT, db.dbPut);

export function* sagaDb() {
  yield takeLatest(DBGET, dbGetSaga);
  yield takeLatest(DBPATCH, dbPatchSaga);
  yield takeLatest(DBPUT, dbPutSaga);
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
    [DBGET_FAILURE]: (state, action) => ({
      ...state,
      dbError: action.payload,
    }),
  },
  initialState,
);

export default dbs;
