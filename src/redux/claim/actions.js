const claimActions = {
    addClaim: claim => {
      return (dispatch, getState) => {
        dispatch({
          type: "CLAIM_REQUEST",
          claim
        });
      };
    },
    addClaimSuccess: (data) => {
      return (dispatch, getState) => {
        dispatch({
          type: "CLAIM_SUCCESS",
          data
        });
      };
    },
    requestClaims: () => {
        return (dispatch, getState) => {
          dispatch({
            type: "CLAIMS_FETCH_REQUEST",
          });
        };
    },
    requestClaimsSuccess: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: "CLAIMS_FETCH_SUCCESS",
                claims: data.claims
            });
        };
    },
    requestClaimById: claimId => {
        return (dispatch, getState) => {
          dispatch({
            type: "CLAIM_FETCH_BY_ID_REQUEST",
            claimId
          });
        };
    },
    requestClaimByIdSuccess: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: "CLAIM_FETCH_BY_ID_SUCCESS",
                claims: data.claims
            });
        };
    },
    requestClaimsByAccount: account => {
        return (dispatch, getState) => {
          dispatch({
            type: "CLAIMS_FETCH_BY_ACC_REQUEST",
            account
          });
        };
    },
    requestClaimsByAccountSuccess: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: "CLAIMS_FETCH_BY_ACC_SUCCESS",
                claims: data.claims
            });
        };
    },
  };
export default claimActions;