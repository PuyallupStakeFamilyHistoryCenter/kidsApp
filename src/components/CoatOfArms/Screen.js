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

export default class CoatOfArmsScreen extends React.Component {
  static navigationOptions = { 
    title: 'Coat of Arms' 
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Coat of Arms app will go here</Text>
      </View>
    );
  }
}
