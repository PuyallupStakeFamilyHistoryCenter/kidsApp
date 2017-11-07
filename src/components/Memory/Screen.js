import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import Modal from '../Shared/Modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10
  },
  bodyText: {
    fontSize: 15,
    marginLeft: 10
  }
});

export default class MemoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let headerRight = (
      <Button
        title="Settings"
        onPress={navigation.state.params && navigation.state.params.onPress || (() => {})}
        backgroundColor="transparent"
        color="#000"
        icon={{name: 'cog', type: 'font-awesome', color: '#000'}}
      />
    );
    return {
      headerRight,
      title: 'Memory Game'
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      firstRender: true,
      showSettings: true
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({
      onPress: this.handleSettingsOpen.bind(this)
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        firstRender: false
      });
    }, 1000);

  }

  handleSettingsClose() {
    this.setState({
      showSettings: false
    });
  }

  handleSettingsOpen() {
    this.setState({
      showSettings: true
    });
  }

  updateDifficulty(selectedIdx) {
    this.setState({
      selectedDifficulty: selectedIdx
    });
  }

  render() {
    let settingsView;

    if (this.state.showSettings) {
      settingsView = (
        <Modal title="Settings" onClose={this.handleSettingsClose.bind(this)} animate={!this.state.firstRender}>
          <Text style={styles.subTitle}>Instructions</Text>
          <Text style={styles.bodyText}>Turn over any two cards to try and find a match. Remember what was on each card and where it was. The game is over when all the cards have been matched.</Text>
          <Text style={styles.subTitle}>Difficulty</Text>
          <ButtonGroup
            onPress={this.updateDifficulty.bind(this)}
            selectedIndex={this.state.selectedDifficulty || 0}
            buttons={['Easy', 'Medium', 'Hard']}
            containerStyle={{height: 75}}
            selectedBackgroundColor="#484d56"
            selectedTextStyle={{color: '#fff'}}
          />
        </Modal>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Memory app will go here</Text>
        {settingsView}
      </View>
    );
  }
}
