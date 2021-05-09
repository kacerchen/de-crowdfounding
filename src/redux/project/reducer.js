import { Map } from 'immutable';
import { fakedata } from '../../containers/Creator/project/fakeconfig';
import cardActions from './actions';
import { func } from 'prop-types';

const cards = fakedata;

// let cards;
// let initState;

const initState = new Map({
  cards
});

export default function cardReducer(state = initState, action) {
  switch (action.type) {
    case cardActions.CHANGE_CARDS:
      return state.set('cards', action.cards);
    case 'FUNDS_FETCH_SUCCESS':
      return state.set('cards', action.cards);
    case 'FUNDS_FETCH_BY_ID_SUCCESS':
      return state.set('cards', action.cards);
    case 'FUNDS_FETCH_BY_ACC_SUCCESS':
      return state.set('cards', action.cards);
    default:
      return state;
  }
}

// export default async function cardReducer({dispatch}) {
//   // let result = await crowdfundServices.default.getFundList((res) => {
//   //   return res;
//   // });

//   // cards = result ? result.contents : [];

//   // // console.log(cards);

//   // initState = new Map({
//   //   cards
//   // });

//   // return (state = initState, action) => {
//   //   switch (action.type) {
//   //     case cardActions.CHANGE_CARDS:
//   //       return state.set('cards', action.cards);
//   //     default:
//   //       return state;
//   //   }
//   // }
//   crowdfundServices.default.getFundList((res) => {
//     return res;
//   }).then((val) => {
//     return val.contents;
//   }).then((val) => {
//     console.log(val);
//     cards = val;
  
//     initState = new Map({
//       cards
//     });
  
//     return (state = initState, action) => {
//       switch (action.type) {
//         case cardActions.CHANGE_CARDS:
//           return state.set('cards', action.cards);
//         default:
//           return state;
//       }
//     }
//   });
// }
