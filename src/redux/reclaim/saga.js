import { all, takeEvery, fork, call, put } from 'redux-saga/effects';
import * as crowdfundServices from '../../api/crowdfundServices';

function* addReclaim(action) {
  try {
    console.log("start");
    const reclaim = yield call(crowdfundServices.default.addReclaim, action.reclaim);
    console.log(reclaim);
    console.log("end");
     yield put({type: "RECLAIM_SUCCESS", data: reclaim});
  } catch (e) {
     yield put({type: "RECLAIM_FAILED", message: e.message});
  }
}

function* fetchReclaims(action) {
    try {
       const all_reclaims = yield call(crowdfundServices.default.getReclaimList);
       yield put({type: "RECLAIMS_FETCH_SUCCESS", reclaims: all_reclaims});
    } catch (e) {
       yield put({type: "RECLAIMS_FETCH_FAILED", message: e.message});
    }
}

function* fetchReclaimById(action) {
    try {
       const reclaim = yield call(crowdfundServices.default.getReclaimById, action.reclaimId);
       yield put({type: "RECLAIM_FETCH_BY_ID_SUCCESS", reclaims: reclaim});
    } catch (e) {
       yield put({type: "RECLAIM_FETCH_BY_ID_FAILED", message: e.message});
    }
}

function* fetchReclaimsByAccount(action) {
    try {
       const reclaims = yield call(crowdfundServices.default.getReclaimByAccount, action.account);
       yield put({type: "RECLAIMS_FETCH_BY_ACC_SUCCESS", reclaims});
    } catch (e) {
       yield put({type: "RECLAIMS_FETCH_BY_ACC_FAILED", message: e.message});
    }
}

export function* changedReclaim() {
  yield takeEvery("RECLAIMS_FETCH_REQUEST", fetchReclaims);
  yield takeEvery("RECLAIM_REQUEST", addReclaim);
  yield takeEvery("RECLAIM_FETCH_BY_ID_REQUEST", fetchReclaimById);
  yield takeEvery("RECLAIMS_FETCH_BY_ACC_REQUEST", fetchReclaimsByAccount);
//   yield takeEvery(actions.CHANGE_CARDS, function*() {});
}
export default function* rootSaga() {
  yield all([fork(changedReclaim)]);
}
