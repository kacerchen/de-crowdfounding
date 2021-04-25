import { all, takeEvery, fork, call, put } from 'redux-saga/effects';
import actions from './actions';
import * as crowdfundServices from '../../api/crowdfundServices';

function* addFund(action) {
  try {
    console.log("start");
    const fund = yield call(crowdfundServices.default.addFund, action.card);
    console.log(fund);
    console.log("end");
     yield put({type: "FUND_ADD_SUCCESS", data: fund});
  } catch (e) {
     yield put({type: "FUND_ADD_FAILED", message: e.message});
  }
}

function* fetchFunds(action) {
  try {
     const funds = yield call(crowdfundServices.default.getFundList);
     yield put({type: "FUNDS_FETCH_SUCCESS", cards: funds});
  } catch (e) {
     yield put({type: "FUNDS_FETCH_FAILED", message: e.message});
  }
}

function* fetchFundsById(action) {
  try {
     const funds = yield call(crowdfundServices.default.getFundById, action.fundId);
     yield put({type: "FUNDS_FETCH_BY_ID_SUCCESS", cards: funds});
  } catch (e) {
     yield put({type: "FUNDS_FETCH_BY_ID_FAILED", message: e.message});
  }
}

function* fetchFundsByAccount(action) {
  try {
     const funds = yield call(crowdfundServices.default.getFundByAccount, action.account);
     yield put({type: "FUNDS_FETCH_BY_ACC_SUCCESS", cards: funds});
  } catch (e) {
     yield put({type: "FUNDS_FETCH_BY_ACC_FAILED", message: e.message});
  }
}

export function* changedCard() {
  yield takeEvery("FUNDS_FETCH_REQUEST", fetchFunds);
  yield takeEvery("FUND_ADD_REQUEST", addFund);
  yield takeEvery("FUNDS_FETCH_BY_ID_REQUEST", fetchFundsById);
  yield takeEvery("FUNDS_FETCH_BY_ACC_REQUEST", fetchFundsByAccount);
  yield takeEvery(actions.CHANGE_CARDS, function*() {});
}
export default function* rootSaga() {
  yield all([fork(changedCard)]);
}
