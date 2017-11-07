import React from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 6,
    maxHeight: Dimensions.get('window').height - (Dimensions.get('window').height * .2),
    minHeight: 200,
    width: Dimensions.get('window').width - (Dimensions.get('window').width * .2)
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 30
  },
  body: {
    margin: 10
  }
});

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
              <View style={{position: 'absolute', right: 0, marginRight: -20}}>
                <Button
                  onPress={this.props.onClose}
                  backgroundColor="transparent"
                  color="#000"
                  icon={{name: 'close', type: 'font-awesome', color: '#000', size: 30}}
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
