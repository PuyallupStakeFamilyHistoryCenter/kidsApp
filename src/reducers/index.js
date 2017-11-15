import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import nav from './nav';
import people from './people';

const AppReducer = combineReducers({
  app,
  auth,
  nav,
  people
});

export default AppReducer;