import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { screenStyles as styles } from './Styles';

export default class ColoringScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Coloring'
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Coloring app will go here</Text>
      </View>
    );
  }
}
