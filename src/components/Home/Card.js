import React from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { cardStyles as styles } from './Styles';

export default class Card extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}><View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={this.props.img}
        >
        </Image>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
      </TouchableOpacity>
    );
  }
}
