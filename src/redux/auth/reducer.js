import { Map } from 'immutable';
import { getToken } from '../../helpers/utility';
import actions from './actions';

const initState = new Map({
  idToken: 'secret token',
  currentProfile: {}
});

export default function authReducer(
  state = initState.merge(getToken()),
  action
) {
  let id_token = localStorage.getItem("id_token");
  let profile = localStorage.getItem("profile");
  let profile_obj = JSON.parse(profile);
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      {
        let updated_map = state.set('currentProfile', profile_obj);
        return updated_map.set('idToken', id_token);
      }
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
