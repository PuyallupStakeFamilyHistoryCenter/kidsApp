const initialAuthState = { fetchingUsers: true };

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
  	case 'MSG.user-list':
  	  return { ...state, userList: action.users, fetchingUsers: false };
    case 'MSG.token':
      return { ...state, userData: {token: action.token, name: action.username}, signInError: false };
    case 'MSG.ok':
      return { ...state, userData: undefined, signInError: false };
    case 'MSG.error':
      if (action.message === 'username and PIN do not match') {
        return { ...state, signInError: true };
      } else {
        return state;
      }
    case 'CLEAR_SIGN_IN_ERR':
      return { ...state, signInError: false };
    case 'UPDATE_USER_DATA':
      return { ...state, userData: { ...state.userData, ...action.data }};
    case 'START_FETCH_USERS':
      return { ...state, fetchingUsers: true, userList: undefined };
    default:
      return state;
  }
}