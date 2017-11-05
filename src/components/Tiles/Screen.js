import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default class TilesScreen extends React.Component {
  static navigationOptions = { 
    title: 'Tiles' 
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Tiles app will go here</Text>
      </View>
    );
  }
}
