import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';

const loginAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(loginAction);

export default function nav(state = initialNavState, action) {
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
    case 'Home':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Home' }),
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