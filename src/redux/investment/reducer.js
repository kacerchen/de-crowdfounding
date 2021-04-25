import { Map } from 'immutable';
import investActions from './actions';

const investments = {};

const initState = new Map({
    investments
});

export default function investReducer(state = initState, action) {
  switch (action.type) {
    case 'INVESTMENTS_FETCH_SUCCESS':
      return state.set('investments', action.investments);
    case 'INVESTMENT_FETCH_BY_ID_SUCCESS':
      return state.set('investments_byId', action.investments);
    case 'INVESTMENTS_FETCH_BY_ACC_SUCCESS':
      return state.set('investments_byAcc', action.investments);
    default:
      return state;
  }
}