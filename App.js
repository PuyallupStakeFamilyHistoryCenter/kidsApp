import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { init as websocketInit, emit } from './src/actions/websocket';

import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigators/AppNavigator';

const middleware = [ thunk.withExtraArgument({ emit }) ]

class App extends React.Component {

  constructor(props) {
  	super(props);
  	this.store = createStore(
	  AppReducer,
	  applyMiddleware(...middleware)
	);
	websocketInit(this.store);
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('App', () => App);

export default App;