import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    width: '100%'
  },
  name: {
    fontSize: 20,
    padding: 10
  }
});

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
