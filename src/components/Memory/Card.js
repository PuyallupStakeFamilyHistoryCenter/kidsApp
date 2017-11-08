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

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  flipCard: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    backfaceVisibility: 'hidden',
    borderWidth: 2,
    borderRadius: 5
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
  },
  backgroundImage: {
    resizeMode: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
});

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
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Image
              style={styles.backgroundImage}
              source={require('../../assets/FHC.png')}
            />
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text>{this.props.id}</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}
