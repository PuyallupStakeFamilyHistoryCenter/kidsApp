import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { screenStyles as styles } from './Styles';

export default class CoatOfArmsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Coat of Arms'
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Coat of Arms app will go here</Text>
      </View>
    );
  }
}
