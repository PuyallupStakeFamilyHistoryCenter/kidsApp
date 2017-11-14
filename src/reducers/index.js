import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import nav from './nav';

const AppReducer = combineReducers({
  app,
  auth,
  nav
});

export default AppReducer;