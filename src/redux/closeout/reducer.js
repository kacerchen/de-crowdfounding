import { Map } from 'immutable';
import closeoutActions from './actions';

const closeouts = {};

const initState = new Map({
    closeouts
});

export default function reclaimReducer(state = initState, action) {
  switch (action.type) {
    case 'CLOSEOUTS_FETCH_SUCCESS':
      return state.set('closeouts', action.closeouts);
    case 'CLOSEOUT_FETCH_BY_ID_SUCCESS':
      return state.set('closeouts_byId', action.closeouts);
    case 'CLOSEOUTS_FETCH_BY_ACC_SUCCESS':
      return state.set('closeouts_byAcc', action.closeouts);
    default:
      return state;
  }
}