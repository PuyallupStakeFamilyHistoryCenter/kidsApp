import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigators/AppNavigator';

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080/');

// Connection opened
socket.addEventListener('open', function (event) {
    console.log('Hello Server!');
    socket.send('list-current-users');
});

// Connection opened
socket.addEventListener('error', function (event) {
  console.log('Hello Error');
  console.log(event);
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ');
    try {
      console.log(JSON.parse(event.data));
    } catch(e) {
      console.log("CAN'T PARSE");
    }
    
});

const store = createStore(
  AppReducer,
  applyMiddleware()
);

class App extends React.Component {
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