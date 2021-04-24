import { all, takeEvery, fork, call, put } from 'redux-saga/effects';
import * as crowdfundServices from '../../api/crowdfundServices';

function* fetchInvestments(action) {
  try {
     const all_investments = yield call(crowdfundServices.default.getInvestmentList);
     yield put({type: "INVESTMENTS_FETCH_SUCCESS", investments: all_investments});
  } catch (e) {
     yield put({type: "INVESTMENTS_FETCH_FAILED", message: e.message});
  }
}

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

export function* changedInvest() {
  yield takeEvery("INVESTMENTS_FETCH_REQUEST", fetchInvestments);
  yield takeEvery("INVEST_REQUEST", addInvestment);
//   yield takeEvery(actions.CHANGE_CARDS, function*() {});
}
export default function* rootSaga() {
  yield all([fork(changedInvest)]);
}
