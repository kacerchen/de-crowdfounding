import { Map } from 'immutable';
import { fakedata } from '../../containers/Ecommerce/project/fakeconfig';
import cardActions from './actions';

const cards = fakedata;

const initState = new Map({
  cards
});

export default function cardReducer(state = initState, action) {
  switch (action.type) {
    case cardActions.CHANGE_CARDS:
      return state.set('cards', action.cards);
    default:
      return state;
  }
}
