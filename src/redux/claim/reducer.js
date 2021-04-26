import { Map } from 'immutable';
import claimActions from './actions';

const claims = {};

const initState = new Map({
    claims
});

export default function claimReducer(state = initState, action) {
  switch (action.type) {
    case 'CLAIMS_FETCH_SUCCESS':
      return state.set('claims', action.claims);
    case 'CLAIM_FETCH_BY_ID_SUCCESS':
      return state.set('claims_byId', action.claims);
    case 'CLAIMS_FETCH_BY_ACC_SUCCESS':
      return state.set('claims_byAcc', action.claims);
    default:
      return state;
  }
}