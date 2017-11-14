const initialAuthState = { websocketConnected: false, websocketError: false };

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
  	case 'APP.WEBSOCKET_CONNECTED':
  	  return { ...state, websocketConnected: true };
    case 'APP.WEBSOCKET_ERROR':
      return { ...state, websocketError: true };
    default:
      return state;
  }
}