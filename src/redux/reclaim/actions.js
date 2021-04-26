const reclaimActions = {
    addReclaim: reclaim => {
      return (dispatch, getState) => {
        dispatch({
          type: "RECLAIM_REQUEST",
          reclaim
        });
      };
    },
    addReclaimSuccess: (data) => {
      return (dispatch, getState) => {
        dispatch({
          type: "RECLAIM_SUCCESS",
          data
        });
      };
    },
    requestReclaims: () => {
        return (dispatch, getState) => {
          dispatch({
            type: "RECLAIMS_FETCH_REQUEST",
          });
        };
    },
    requestReclaimsSuccess: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: "RECLAIMS_FETCH_SUCCESS",
                reclaims: data.reclaims
            });
        };
    },
    requestReclaimById: reclaimId => {
        return (dispatch, getState) => {
          dispatch({
            type: "RECLAIM_FETCH_BY_ID_REQUEST",
            reclaimId
          });
        };
    },
    requestReclaimByIdSuccess: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: "RECLAIM_FETCH_BY_ID_SUCCESS",
                reclaims: data.reclaims
            });
        };
    },
    requestReclaimsByAccount: account => {
        return (dispatch, getState) => {
          dispatch({
            type: "RECLAIMS_FETCH_BY_ACC_REQUEST",
            account
          });
        };
    },
    requestReclaimsByAccountSuccess: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: "RECLAIMS_FETCH_BY_ACC_SUCCESS",
                reclaims: data.reclaims
            });
        };
    },
  };
export default reclaimActions;