import { combineReducers } from 'redux';
import auth from './auth';
import nav from './nav';

const AppReducer = combineReducers({
  auth,
  nav
});

export default AppReducer;