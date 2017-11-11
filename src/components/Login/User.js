import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { userStyles as styles } from './Styles';

export default class User extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.onTap(this.props.id)}>
          <Text style={styles.name}>{this.props.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
