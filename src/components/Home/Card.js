import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000',
    height: 300,
    width: 300,
    margin: 10
  },
  containerNoImage: {
    backgroundColor: '#1f69e0',
  },
  backgroundImage: {
    resizeMode: 'cover',
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  title: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    textAlign: 'center',
    fontSize: 30,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});

export default class Card extends React.Component {
  render() {
    if (this.props.img) {
      return (
        <TouchableOpacity onPress={this.props.onPress}><View style={styles.container}>
          <Image
            style={styles.backgroundImage}
            source={{ uri: this.props.img }}
          >
            <Text style={styles.title}>{this.props.title}</Text>
          </Image>
        </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[styles.container, styles.containerNoImage]}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      );
    }
    
  }
}
