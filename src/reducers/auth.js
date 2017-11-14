const initialAuthState = { fetchingUsers: true };

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
  	case 'MSG.user-list':
  	  return { ...state, userList: action.users, fetchingUsers: false };
    case 'MSG.token':
      return { ...state, userToken: action.token };
    default:
      return state;
  }
}