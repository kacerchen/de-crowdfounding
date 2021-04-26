const closeoutActions = {
    addCloseout: closeout => {
      return (dispatch, getState) => {
        dispatch({
          type: "CLOSEOUT_REQUEST",
          closeout
        });
      };
    },
    addCloseoutSuccess: (data) => {
      return (dispatch, getState) => {
        dispatch({
          type: "CLOSEOUT_SUCCESS",
          data
        });
      };
    },
    requestCloseouts: () => {
        return (dispatch, getState) => {
          dispatch({
            type: "CLOSEOUTS_FETCH_REQUEST",
          });
        };
    },
    requestCloseoutsSuccess: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: "CLOSEOUTS_FETCH_SUCCESS",
                closeouts: data.closeouts
            });
        };
    },
    requestCloseoutById: closeoutId => {
        return (dispatch, getState) => {
          dispatch({
            type: "CLOSEOUT_FETCH_BY_ID_REQUEST",
            closeoutId
          });
        };
    },
    requestCloseoutByIdSuccess: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: "CLOSEOUT_FETCH_BY_ID_SUCCESS",
                closeouts: data.closeouts
            });
        };
    },
    requestCloseoutsByAccount: account => {
        return (dispatch, getState) => {
          dispatch({
            type: "CLOSEOUTS_FETCH_BY_ACC_REQUEST",
            account
          });
        };
    },
    requestCloseoutsByAccountSuccess: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: "CLOSEOUTS_FETCH_BY_ACC_SUCCESS",
                closeouts: data.closeouts
            });
        };
    },
  };
export default closeoutActions;