import { Map } from 'immutable';
import investActions from './actions';

const investments = {};

const initState = new Map({
    investments
});

export default function investReducer(state = initState, action) {
  switch (action.type) {
    case 'INVEST_SUCCESS':
      return state.set('investments', action.investments);
    case 'INVESTMENTS_FETCH_SUCCESS':
      return state.set('investments', action.investments);
    default:
      return state;
  }
}