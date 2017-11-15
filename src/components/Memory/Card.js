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

function getParameterByName(url, name) {
  const parsedName = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

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
    };
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    };
    let backCardMarkup;
    if (this.props.type === 'image') {
      // TODO: Figure out how to use image cache URL
      let url = getParameterByName(this.props.data, 'ref').split("?")[0];
      backCardMarkup = (
        <Image
          style={styles.backgroundImage}
          source={{uri: url}}
        />
      );
    } else {
      let strText = this.props.data;
      if (this.props.type === 'birth') {
        strText = 'Birth: ' + strText;
      } else if (this.props.type === 'death') {
        strText = 'Death: ' + strText;
      }
      backCardMarkup = <Text style={{fontSize: this.props.fontSize}}>{strText}</Text>;
    }
    let subTitleMarkup;
    if (this.props.subTitle) {
      subTitleMarkup = <Text style={[styles.subTitle, {fontSize: this.props.fontSize}]}>{this.props.subTitle}</Text>;
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
            {backCardMarkup}
            {subTitleMarkup}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}
