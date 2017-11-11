import React from 'react';
import { Animated, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from 'react-native-elements';
import { modalStyles as styles } from './Styles';
import { FONT_COLOR_DARK } from '../Styles';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(100)
    };
  }
  componentDidMount() {
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 0,
        velocity: 10,
        tension: 0,
        friction: 5
      }
    ).start();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onClose}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View style={[styles.modal, {transform: [{translateY: (this.props.animate ? this.state.bounceValue : 0)}]}]}>
              <Text style={styles.title}>{this.props.title}</Text>
              <View style={styles.closeBtn}>
                <Button
                  onPress={this.props.onClose}
                  backgroundColor="transparent"
                  color={FONT_COLOR_DARK}
                  icon={{name: 'close', type: 'font-awesome', color: FONT_COLOR_DARK, size: 30}}
                />
              </View>
              <ScrollView style={styles.body}>
                {this.props.children}
              </ScrollView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
