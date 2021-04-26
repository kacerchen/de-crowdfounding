import { all, takeEvery, fork, call, put } from 'redux-saga/effects';
import * as crowdfundServices from '../../api/crowdfundServices';

function* addCloseout(action) {
  try {
    console.log("start");
    const closeout = yield call(crowdfundServices.default.addCloseout, action.closeout);
    console.log(closeout);
    console.log("end");
     yield put({type: "CLOSEOUT_SUCCESS", data: closeout});
  } catch (e) {
     yield put({type: "CLOSEOUT_FAILED", message: e.message});
  }
}

function* fetchCloseouts(action) {
    try {
       const all_closeouts = yield call(crowdfundServices.default.getCloseoutList);
       yield put({type: "CLOSEOUTS_FETCH_SUCCESS", closeouts: all_closeouts});
    } catch (e) {
       yield put({type: "CLOSEOUTS_FETCH_FAILED", message: e.message});
    }
}

function* fetchCloseoutById(action) {
    try {
       const closeout = yield call(crowdfundServices.default.getCloseoutById, action.closeoutId);
       yield put({type: "CLOSEOUT_FETCH_BY_ID_SUCCESS", closeouts: closeout});
    } catch (e) {
       yield put({type: "CLOSEOUT_FETCH_BY_ID_FAILED", message: e.message});
    }
}

function* fetchCloseoutsByAccount(action) {
    try {
       const closeouts = yield call(crowdfundServices.default.getCloseoutByAccount, action.account);
       yield put({type: "CLOSEOUTS_FETCH_BY_ACC_SUCCESS", closeouts});
    } catch (e) {
       yield put({type: "CLOSEOUTS_FETCH_BY_ACC_FAILED", message: e.message});
    }
}

export function* changedCloseout() {
  yield takeEvery("CLOSEOUTS_FETCH_REQUEST", fetchCloseouts);
  yield takeEvery("CLOSEOUT_REQUEST", addCloseout);
  yield takeEvery("CLOSEOUT_FETCH_BY_ID_REQUEST", fetchCloseoutById);
  yield takeEvery("CLOSEOUTS_FETCH_BY_ACC_REQUEST", fetchCloseoutsByAccount);
//   yield takeEvery(actions.CHANGE_CARDS, function*() {});
}
export default function* rootSaga() {
  yield all([fork(changedCloseout)]);
}
