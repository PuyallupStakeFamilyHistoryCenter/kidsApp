const initialAuthState = { fetchingPeople: true };

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
  	case 'MSG.people':
  	  return { ...state, people: action.people, fetchingPeople: false };
    default:
      return state;
  }
}