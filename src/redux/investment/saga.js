import { all, takeEvery, fork, call, put } from 'redux-saga/effects';
import * as crowdfundServices from '../../api/crowdfundServices';

function* addInvestment(action) {
  try {
    console.log("start");
    const investment = yield call(crowdfundServices.default.addInvestment, action.investment);
    console.log(investment);
    console.log("end");
     yield put({type: "INVEST_SUCCESS", data: investment});
  } catch (e) {
     yield put({type: "INVEST_FAILED", message: e.message});
  }
}

function* fetchInvestments(action) {
    try {
       const all_investments = yield call(crowdfundServices.default.getInvestmentList);
       yield put({type: "INVESTMENTS_FETCH_SUCCESS", investments: all_investments});
    } catch (e) {
       yield put({type: "INVESTMENTS_FETCH_FAILED", message: e.message});
    }
}

function* fetchInvestmentById(action) {
    try {
       const investment = yield call(crowdfundServices.default.getInvestmentById, action.investmentId);
       yield put({type: "INVESTMENTS_FETCH_SUCCESS", investments: investment});
    } catch (e) {
       yield put({type: "INVESTMENTS_FETCH_FAILED", message: e.message});
    }
}

function* fetchInvestmentByAccount(action) {
    try {
       const investments = yield call(crowdfundServices.default.getInvestmentByAccount, action.account);
       yield put({type: "INVESTMENTS_FETCH_SUCCESS", investments});
    } catch (e) {
       yield put({type: "INVESTMENTS_FETCH_FAILED", message: e.message});
    }
}

export function* changedInvest() {
  yield takeEvery("INVESTMENTS_FETCH_REQUEST", fetchInvestments);
  yield takeEvery("INVEST_REQUEST", addInvestment);
  yield takeEvery("INVESTMENT_FETCH_BY_ID_REQUEST", fetchInvestmentById);
  yield takeEvery("INVESTMENTS_FETCH_BY_ACC_REQUEST", fetchInvestmentByAccount);
//   yield takeEvery(actions.CHANGE_CARDS, function*() {});
}
export default function* rootSaga() {
  yield all([fork(changedInvest)]);
}
