import { func } from 'prop-types';
import { fakedata } from '../../containers/Creator/project/fakeconfig';
import * as crowdfundServices from '../../api/crowdfundServices';
const cardActions = {
  CHANGE_CARDS: 'CHANGE_CARDS',
  addCard: card => {
    return (dispatch, getState) => {
      dispatch({
        type: "FUND_ADD_REQUEST",
        card
      });
    };
    // return (dispatch, getState) => {
    //   const cards = [card, ...getState().Projects.get('cards')];
    //   dispatch({
    //     type: cardActions.CHANGE_CARDS,
    //     cards
    //   });
    // };
  },
  addCardSuccess: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: "FUND_ADD_SUCCESS",
        data
      });
    };
  },
  editCard: editCard => {
    return (dispatch, getState) => {
      const oldCards = getState().Projects.get('cards');
      const cards = [];
      oldCards.forEach(card => {
        if (card.id !== editCard.id) {
          cards.push(card);
        } else {
          cards.push(editCard);
        }
      });
      dispatch({
        type: cardActions.CHANGE_CARDS,
        cards
      });
    };
  },
  deleteCard: deletedCard => {
    return (dispatch, getState) => {
      const oldCards = getState().Projects.get('cards');
      const cards = [];
      oldCards.forEach(card => {
        if (card.id !== deletedCard.id) {
          cards.push(card);
        }
      });
      dispatch({
        type: cardActions.CHANGE_CARDS,
        cards
      });
    };
  },
  restoreCards: () => {
    return {
      type: cardActions.CHANGE_CARDS,
      cards: fakedata
    };
  },
  requestCards: () => {
    return (dispatch, getState) => {
      dispatch({
        type: "FUNDS_FETCH_REQUEST",
      });
    };
  },
  requestCardsSuccess: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: "FUNDS_FETCH_SUCCESS",
        cards: data.cards
      });
    };
  },
  requestCardsById: fundId => {
    return (dispatch, getState) => {
      dispatch({
        type: "FUNDS_FETCH_BY_ID_REQUEST",
        fundId
      });
    };
  },
  requestCardsByIdSuccess: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: "FUNDS_FETCH_BY_ID_SUCCESS",
        cards: data.cards
      });
    };
  },
  requestCardsByAccount: account => {
    return (dispatch, getState) => {
      dispatch({
        type: "FUNDS_FETCH_BY_ACC_REQUEST",
        account
      });
    };
  },
  requestCardsByAccountSuccess: (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: "FUNDS_FETCH_BY_ACC_SUCCESS",
        cards: data.cards
      });
    };
  },
};
export default cardActions;
