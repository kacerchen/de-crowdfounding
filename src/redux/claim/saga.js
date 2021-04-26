import { all, takeEvery, fork, call, put } from 'redux-saga/effects';
import * as crowdfundServices from '../../api/crowdfundServices';

function* addClaim(action) {
  try {
    console.log("start");
    const claim = yield call(crowdfundServices.default.addClaim, action.claim);
    console.log(claim);
    console.log("end");
     yield put({type: "CLAIM_SUCCESS", data: claim});
  } catch (e) {
     yield put({type: "CLAIM_FAILED", message: e.message});
  }
}

function* fetchClaims(action) {
    try {
       const all_claims = yield call(crowdfundServices.default.getClaimList);
       yield put({type: "CLAIMS_FETCH_SUCCESS", claims: all_claims});
    } catch (e) {
       yield put({type: "CLAIMS_FETCH_FAILED", message: e.message});
    }
}

function* fetchClaimById(action) {
    try {
       const claim = yield call(crowdfundServices.default.getClaimById, action.claimId);
       yield put({type: "CLAIM_FETCH_BY_ID_SUCCESS", claims: claim});
    } catch (e) {
       yield put({type: "CLAIM_FETCH_BY_ID_FAILED", message: e.message});
    }
}

function* fetchClaimsByAccount(action) {
    try {
       const claims = yield call(crowdfundServices.default.getClaimByAccount, action.account);
       yield put({type: "CLAIMS_FETCH_BY_ACC_SUCCESS", claims});
    } catch (e) {
       yield put({type: "CLAIMS_FETCH_BY_ACC_FAILED", message: e.message});
    }
}

export function* changedClaim() {
  yield takeEvery("CLAIMS_FETCH_REQUEST", fetchClaims);
  yield takeEvery("CLAIM_REQUEST", addClaim);
  yield takeEvery("CLAIM_FETCH_BY_ID_REQUEST", fetchClaimById);
  yield takeEvery("CLAIMS_FETCH_BY_ACC_REQUEST", fetchClaimsByAccount);
//   yield takeEvery(actions.CHANGE_CARDS, function*() {});
}
export default function* rootSaga() {
  yield all([fork(changedClaim)]);
}
