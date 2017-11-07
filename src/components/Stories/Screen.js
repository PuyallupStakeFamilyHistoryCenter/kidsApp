import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default class StoriesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Stories'
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Stories app will go here</Text>
      </View>
    );
  }
}
