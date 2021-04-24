const investActions = {
    addInvestment: investment => {
      return (dispatch, getState) => {
        dispatch({
          type: "INVEST_REQUEST",
          investment
        });
      };
    },
    addInvestmentSuccess: (data) => {
      return (dispatch, getState) => {
        dispatch({
          type: "INVEST_SUCCESS",
          data
        });
      };
    },
    requestInvestments: () => {
        return (dispatch, getState) => {
          dispatch({
            type: "INVESTMENTS_FETCH_REQUEST",
          });
        };
    },
    requestCardsSuccess: (data) => {
        return (dispatch, getState) => {
            dispatch({
            type: "INVESTMENTS_FETCH_SUCCESS",
            investments: data.investments
            });
        };
    },
  };
export default investActions;