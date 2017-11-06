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

export default class TilesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let headerRight = (
      <Button
        title="Settings"
        onPress={() => {}}
        backgroundColor="transparent"
        color="#000"
        icon={{name: 'cog', type: 'font-awesome', color: '#000'}}
      />
    );
    return {
      headerRight,
      title: 'Tiles'
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Tiles app will go here</Text>
      </View>
    );
  }
}
