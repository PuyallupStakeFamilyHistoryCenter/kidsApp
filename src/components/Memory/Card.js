import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image
} from 'react-native';
import { cardStyles as styles } from './Styles';

export default class Card extends React.Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.flipped && this.props.flipped) {
      this.flipCard(false);
    }
  }

  flipCard(useCallback = true) {
    if (this.props.solved) {
      return;
    }
    if (this.props.flipped) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
    if (useCallback) {
      this.props.onTap();
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
    return (
      <View style={[styles.container, {height: this.props.height, width: this.props.width}]}>
        <TouchableOpacity onPress={() => this.flipCard()}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle, (this.props.flipped ? {zIndex: 1} : {zIndex: 2})]}>
            <Image
              style={styles.backgroundImage}
              source={require('../../assets/FHC-Small.jpg')}
            />
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack, (this.props.flipped ? {zIndex: 2} : {zIndex: 1})]}>
            <Text>{this.props.id}</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}
