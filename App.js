import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as actions from './src/actions';

import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigators/AppNavigator';

const store = createStore(
  AppReducer,
  applyMiddleware(thunk)
);

class App extends React.Component {

  componentDidMount() {
    store.dispatch(actions.SETUP_WEBSOCKET());
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('App', () => App);

export default App;