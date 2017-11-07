import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import Modal from '../Shared/Modal';
import Card from './Card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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
  },
  board: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: 'green',
    width: '100%',
    height: '100%'
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

  handleCardTap(idx) {
    if (this.matchTimer) {
      clearTimeout(this.matchTimer);
      this.matchTimer = null;
      this.refs['memoryCard-'+this.state.pendingCard1].flipCard(false);
      this.refs['memoryCard-'+this.state.pendingCard2].flipCard(false);
      this.setState({
        pendingCard1: idx,
        pendingCard2: undefined
      });
    } else if (this.state.pendingCard1 !== undefined) {
      console.log("$$$ - " + this.state.pendingCard1 + ' - ' + idx);
      this.matchTimer = setTimeout(() => {
        this.refs['memoryCard-'+idx].flipCard(false);
        this.refs['memoryCard-'+this.state.pendingCard1].flipCard(false);
        this.setState({
          pendingCard1: undefined,
          pendingCard2: undefined
        });
        this.matchTimer = null;
      }, 2000);
      this.setState({
        pendingCard2: idx
      });
    } else {
      this.setState({
        pendingCard1: idx
      });
    }
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
          />
        </Modal>
      );
    }

    let cards = [];
    let cardCount;
    let cardHeight;
    let cardWidth;
    switch(this.state.selectedDifficulty) {
    case 2:
      cardCount = 40;
      cardHeight = '20%';
      cardWidth = '12.5%';
      break;
    case 1:
      cardCount = 24;
      cardHeight = '25%';
      cardWidth = (100/6 + '%');
      break;
    default:
      cardCount = 12;
      cardHeight = '33%';
      cardWidth = '25%';
    }
    for (let i = 0; i < cardCount; i++) {
      cards.push(<Card key={'memory-'+i} ref={'memoryCard-'+i} cardHeight={cardHeight} cardWidth={cardWidth} onTap={this.handleCardTap.bind(this, i)}/>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.board}>
          {cards}
        </View>
        {settingsView}
      </View>
    );
  }
}
