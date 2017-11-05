import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';

const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    case 'CoatOfArms':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'CoatOfArms' }),
        state
      );
      break;
    case 'Coloring':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Coloring' }),
        state
      );
      break;
    case 'Hangman':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Hangman' }),
        state
      );
      break;
    case 'Memory':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Memory' }),
        state
      );
      break;
    case 'Puzzle':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Puzzle' }),
        state
      );
      break;
      case 'Quiz':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Quiz' }),
        state
      );
      break;
    case 'Stats':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Stats' }),
        state
      );
      break;
    case 'Stories':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Stories' }),
        state
      );
      break;
    case 'Tiles':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Tiles' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav,
  auth,
});

export default AppReducer;