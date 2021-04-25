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
    requestInvestmentsSuccess: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: "INVESTMENTS_FETCH_SUCCESS",
                investments: data.investments
            });
        };
    },
    requestInvestmentById: investmentId => {
        return (dispatch, getState) => {
          dispatch({
            type: "INVESTMENT_FETCH_BY_ID_REQUEST",
            investmentId
          });
        };
    },
    requestInvestmentByIdSuccess: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: "INVESTMENT_FETCH_BY_ID_SUCCESS",
                investments: data.investments
            });
        };
    },
    requestInvestmentsByAccount: account => {
        return (dispatch, getState) => {
          dispatch({
            type: "INVESTMENTS_FETCH_BY_ACC_REQUEST",
            account
          });
        };
    },
    requestInvestmentsByAccountSuccess: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: "INVESTMENTS_FETCH_BY_ACC_SUCCESS",
                investments: data.investments
            });
        };
    },
  };
export default investActions;