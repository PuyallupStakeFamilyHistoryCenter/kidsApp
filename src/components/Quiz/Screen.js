import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { screenStyles as styles } from './Styles';

export default class QuizScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Quiz app will go here</Text>
      </View>
    );
  }
}
