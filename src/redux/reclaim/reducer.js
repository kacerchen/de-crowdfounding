import { Map } from 'immutable';
import reclaimActions from './actions';

const reclaims = {};

const initState = new Map({
    reclaims
});

export default function reclaimReducer(state = initState, action) {
  switch (action.type) {
    case 'RECLAIMS_FETCH_SUCCESS':
      return state.set('reclaims', action.reclaims);
    case 'RECLAIM_FETCH_BY_ID_SUCCESS':
      return state.set('reclaims_byId', action.reclaims);
    case 'RECLAIMS_FETCH_BY_ACC_SUCCESS':
      return state.set('reclaims_byAcc', action.reclaims);
    default:
      return state;
  }
}