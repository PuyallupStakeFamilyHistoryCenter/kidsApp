const initialAuthState = { isLoggedIn: false, fetchingUsers: true };

export default function auth(state = initialAuthState, action) {
	console.log("SOMETHING HERE")
  switch (action.type) {
  	case 'list-current-users':
  	  console.log("uuu");
  	  console.log(state);
  	  console.log('----');
  	  console.log(action);
  	  console.log("uuu");
  	  return { ...state };
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}