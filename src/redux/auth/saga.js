import { all, takeEvery, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { clearToken } from '../../helpers/utility';
import actions from './actions';

const fakeApiCall = true; // auth0 or express JWT

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*(action) {
    console.log(action);
    
    if (action.authResponse) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: action.authResponse.credential,
        profile: action.authResponse.additionalUserInfo.profile
      });
    } else {
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    console.log(`login success: ${payload.token}`);
    yield localStorage.setItem('id_token', payload.token.accessToken);
    yield localStorage.setItem('profile', JSON.stringify(payload.profile));
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    clearToken();
    yield put(push('/'));
  });
}
export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout)
  ]);
}
