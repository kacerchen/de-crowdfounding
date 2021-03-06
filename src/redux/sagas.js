import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import contactSagas from './contacts/saga';
import mailSagas from './mail/saga';
import notesSagas from './notes/saga';
import todosSagas from './todos/saga';
import cardsSagas from './card/saga';
import projectSagas from './project/saga';
import investmentSagas from './investment/saga';
import claimSagas from './claim/saga';
import reclaimSagas from './reclaim/saga';
import closeoutSagas from './closeout/saga';
import youtubeSearchSagas from './youtubeSearch/sagas';
import devSagas from '../customApp/redux/sagas';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    contactSagas(),
    mailSagas(),
    notesSagas(),
    todosSagas(),
    cardsSagas(),
    projectSagas(),
    investmentSagas(),
    claimSagas(),
    reclaimSagas(),
    closeoutSagas(),
    youtubeSearchSagas(),
    devSagas()
  ]);
}
