import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import Modal from '../Shared/Modal';
import Card from './Card';
import { screenStyles as styles } from './Styles';
import { BACKGROUND_COLOR_CONFIRM, BORDER_RADIUS, FONT_COLOR_DARK, FONT_COLOR_LIGHT, FONT_SIZE_S, FONT_SIZE_M, FONT_SIZE_L } from '../Styles';
import { SEND_WEBSOCKET } from '../../actions';

class CardModel {
  constructor(id, height, width, type, data, subTitle) {
    this.id = id;
    this.height = height;
    this.width = width;
    this.type = type;
    this.data = data;
    this.subTitle = subTitle;
    this.flipped = false;
    this.solved = false;
  }
}

class MemoryScreen extends React.Component {
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
      cardType1: 0,
      cardType2: 1,
      firstRender: true,
      selectedDifficulty: 0,
      showSettings: true,
      matches: 0,
      winner: false
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({
      onPress: this.handleSettingsOpen.bind(this)
    });
    SEND_WEBSOCKET('get-ancestors ' + this.props.userData.token + ' ' + this.props.userData.id);
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

  updateCardType(cardNum, selectedIdx) {
    if (cardNum === 1) {
      if (this.state.cardType1 !== selectedIdx) {
        this.resetGame();
      }
      newState = {
        cardType1: selectedIdx
      };
    } else {
      if (this.state.cardType2 !== selectedIdx) {
        this.resetGame();
      }
      newState = {
        cardType2: selectedIdx
      };
    }
    this.setState(newState);
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

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
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
    let validateData = (type, data) => {
      let isValid = true;
      switch(type) {
      case 0: //Name
        isValid = !!data.name;
        break;
      case 1: //Image
        isValid = !!(data.images && data.images.length);
        break;
      case 2: //Birthdate
        isValid = !!(data.facts && data.facts.length);
        if (isValid) {
          isValid = !!data.facts.find(fact => {
            return fact.type === 'Birth';
          });
        }
        break;
      case 3: //Deathdate
        isValid = !!(data.facts && data.facts.length);
        if (isValid) {
          isValid = !!data.facts.find(fact => {
            return fact.type === 'Death';
          });
        }
        break;
      default:
        isValid = false;
      }
      return isValid;
    }
    let validPeople = this.props.people.filter(person => {
      let validType1 = validateData(this.state.cardType1, person);
      let validType2 = validateData(this.state.cardType2, person);
      return person.living === false && validType1 && validType2;
    });
    validPeople = this.shuffle(validPeople);
    let trimmedPeople = validPeople.slice(0, cardCount/2);
    let cards = [];
    trimmedPeople.forEach(person => {
      let getData = (type, data) => {
        let result;
        let typeStr;
        switch(type) {
        case 0: //Name
          result = data.name;
          typeStr = 'name';
          break;
        case 1: //Image
          result = 'https://localhost:8443' + data.images[0];
          typeStr = 'image';
          break;
        case 2: //Birthdate
          let birthFact = data.facts.find(fact => {
            return fact.type === 'Birth';
          });
          result = birthFact.date;
          typeStr = 'birth';
          break;
        case 3: //Deathdate
          let deathFact = data.facts.find(fact => {
            return fact.type === 'Death';
          });
          result = deathFact.date;
          typeStr = 'death';
          break;
        }
        return {
          type: typeStr,
          result
        };
      }
      let cardData1 = getData(this.state.cardType1, person);
      let cardData2 = getData(this.state.cardType2, person);
      let subTitle1;
      let subTitle2;
      if (cardData1.type !== 'name' && cardData2.type !== 'name') {
        subTitle1 = person.name;
        if (cardData1.type === cardData2.type) {
          subTitle2 = subTitle1;
        }
      }
      cards.push(new CardModel(person.id, cardHeight, cardWidth, cardData1.type, cardData1.result, subTitle1));
      cards.push(new CardModel(person.id, cardHeight, cardWidth, cardData2.type, cardData2.result, subTitle2));
    });
    cards = this.shuffle(cards);
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
    if (this.props.fetchingPeople) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }

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
            selectedIndex={this.state.selectedDifficulty}
            buttons={['Easy', 'Medium', 'Hard']}
            containerStyle={{height: 50}}
            containerBorderRadius={BORDER_RADIUS}
            selectedBackgroundColor={BACKGROUND_COLOR_CONFIRM}
            selectedTextStyle={{color: FONT_COLOR_LIGHT}}
          />
          <Text style={styles.subTitle}>First Card Type</Text>
          <ButtonGroup
            onPress={this.updateCardType.bind(this, 1)}
            selectedIndex={this.state.cardType1}
            buttons={['Name', 'Image', 'Birthdate', 'Deathdate']}
            containerStyle={{height: 50}}
            containerBorderRadius={BORDER_RADIUS}
            selectedBackgroundColor={BACKGROUND_COLOR_CONFIRM}
            selectedTextStyle={{color: FONT_COLOR_LIGHT}}
          />
          <Text style={styles.subTitle}>Second Card Type</Text>
          <ButtonGroup
            onPress={this.updateCardType.bind(this, 2)}
            selectedIndex={this.state.cardType2}
            buttons={['Name', 'Image', 'Birthdate', 'Deathdate']}
            containerStyle={{height: 50}}
            containerBorderRadius={BORDER_RADIUS}
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
    let fontSize = this.state.selectedDifficulty === 0 ? FONT_SIZE_L : this.state.selectedDifficulty === 1 ? FONT_SIZE_M : FONT_SIZE_S;
    this.state.cards.forEach((card, i) => {
      cards.push(<Card key={'memory-'+i} onTap={this.handleCardTap.bind(this, i)} fontSize={fontSize} {...card}/>)
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

const mapStateToProps = state => {
  const { userData } = state.auth;
  const { fetchingPeople, people } = state.people;
  return {
    fetchingPeople,
    people,
    userData
  }
}

export default connect(mapStateToProps)(MemoryScreen)
