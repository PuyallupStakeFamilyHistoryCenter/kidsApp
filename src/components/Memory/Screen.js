import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import Modal from '../Shared/Modal';
import Card from './Card';
import { screenStyles as styles } from './Styles';
import { BACKGROUND_COLOR_CONFIRM, FONT_COLOR_DARK, FONT_COLOR_LIGHT } from '../Styles';

class CardModel {
  constructor(id, height, width) {
    this.id = id;
    this.height = height;
    this.width = width;
    this.flipped = false;
    this.solved = false;
  }
}

export default class MemoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let headerRight = (
      <Button
        title="Settings"
        onPress={navigation.state.params && navigation.state.params.onPress || (() => {})}
        backgroundColor="transparent"
        color={FONT_COLOR_DARK}
        icon={{name: 'cog', type: 'font-awesome', color: FONT_COLOR_DARK}}
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
      cards: [],
      firstRender: true,
      showSettings: true,
      matches: 0,
      winner: false
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
    this.setupGame();
  }

  handleSettingsOpen() {
    this.setState({
      showSettings: true
    });
  }

  updateDifficulty(selectedIdx) {
    if (this.state.selectedDifficulty !== selectedIdx) {
      this.resetGame();
    }
    this.setState({
      selectedDifficulty: selectedIdx
    });
  }

  resetGame() {
    this.setState({
      cards: [],
      pendingCard1: undefined,
      pendingCard2: undefined,
      matches: 0,
      winner: false
    });
  }

  setupGame() {
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
    let cards = [];
    for (let i = 0; i < cardCount; i++) {
      cards.push(new CardModel(i%2===0 ? i : i-1, cardHeight, cardWidth));
    }
    this.setState({
      cards
    });
  }

  handleCardTap(idx) {
    let modifiedCards = this.state.cards.concat([]);
    let pendingCard1 = this.state.pendingCard1;
    let pendingCard2 = this.state.pendingCard2;
    let matches = this.state.matches;
    let winner = this.state.winner;
    if (this.matchTimer) {
      //Flipping a card while a non match is waiting to flip back
      modifiedCards[pendingCard1].flipped = false;
      modifiedCards[pendingCard2].flipped = false;
      if (idx !== pendingCard1 && idx !== pendingCard2) {
        modifiedCards[idx].flipped = true;
        pendingCard1 = idx;
        pendingCard2 = undefined;
      } else {
        pendingCard1 = undefined;
        pendingCard2 = undefined;
      }
      clearTimeout(this.matchTimer);
      this.matchTimer = undefined;
    } else if (pendingCard1 !== undefined) {
      if (pendingCard1 === idx) {
        //Fliping first card back over
        modifiedCards[idx].flipped = false;
        pendingCard1 = undefined;
      } else {
        //2nd card flip
        modifiedCards[idx].flipped = true;
        pendingCard2 = idx;
        if (modifiedCards[pendingCard1].id === modifiedCards[pendingCard2].id) {
          //Match found
          modifiedCards[pendingCard1].solved = true;
          modifiedCards[pendingCard2].solved = true;
          pendingCard1 = undefined;
          pendingCard2 = undefined;
          matches++;
          if (matches === (modifiedCards.length/2)) {
            winner = true;
            setTimeout(() => {
              this.resetGame();
              this.setupGame();
            }, 3000);
          }
        } else {
          //No Match
          this.matchTimer = setTimeout(() => {
            modifiedCards[pendingCard1].flipped = false;
            modifiedCards[pendingCard2].flipped = false;
            pendingCard1 = undefined;
            pendingCard2 = undefined;
            this.matchTimer = undefined;
            this.setState({
              cards: modifiedCards,
              pendingCard1,
              pendingCard2
            });
          }, 2000);
        }
      }
    } else {
      //1st card flip
      modifiedCards[idx].flipped = true;
      pendingCard1 = idx;
    }
    this.setState({
      cards: modifiedCards,
      pendingCard1,
      pendingCard2,
      matches,
      winner
    });
  }

  render() {
    let settingsView;
    let winnerView;
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
            selectedBackgroundColor={BACKGROUND_COLOR_CONFIRM}
            selectedTextStyle={{color: FONT_COLOR_LIGHT}}
          />
        </Modal>
      );
    } else if (this.state.winner) {
      winnerView = (
        <View style={styles.winner}>
          <Text style={styles.winnerText}>YOU WIN!</Text>
        </View>
      );
    }

    let cards = [];
    this.state.cards.forEach((card, i) => {
      cards.push(<Card key={'memory-'+i} onTap={this.handleCardTap.bind(this, i)} {...card}/>)
    });

    return (
      <View style={styles.container}>
        <View style={styles.board}>
          {cards}
        </View>
        {winnerView}
        {settingsView}
      </View>
    );
  }
}
