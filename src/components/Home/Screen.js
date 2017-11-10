import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Card from './Card';
import { screenStyles as styles } from './Styles';
import { FONT_COLOR_DARK } from '../Styles';

const games = [{
  props: {
    title: 'Coat of Arms',
    img: require('../../assets/CoatOfArms-Card.png')
  },
  route: 'CoatOfArms'
}, {
  props: {
    title: 'Coloring',
    img: require('../../assets/Crayons-Card.jpg')
  },
  route: 'Coloring'
}, {
  props: {
    title: 'Hangman',
    img: require('../../assets/Hangman-Card.jpg')
  },
  route: 'Hangman'
}, {
  props: {
    title: 'Memory Game',
    img: require('../../assets/Memory-Card.png')
  },
  route: 'Memory'
}, {
  props: {
    title: 'Puzzle',
    img: require('../../assets/Puzzle-Card.jpg')
  },
  route: 'Puzzle'
}, {
  props: {
    title: 'Quiz',
    img: require('../../assets/Quiz-Card.png')
  },
  route: 'Quiz'
}, {
  props: {
    title: 'Statistics',
    img: require('../../assets/Stats-Card.jpg')
  },
  route: 'Stats'
}, {
  props: {
    title: 'Stories',
    img: require('../../assets/Stories-Card.jpg')
  },
  route: 'Stories'
}, {
  props: {
    title: 'Tile Game',
    img: require('../../assets/Tile-Card.png')
  },
  route: 'Tiles'
}];

export default class MainScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let headerRight = (
      <Button
        title="Switch User"
        onPress={() => navigation.dispatch({ type: 'Login' })}
        backgroundColor="transparent"
        color={FONT_COLOR_DARK}
        icon={{name: 'user', type: 'font-awesome', color: FONT_COLOR_DARK}}
      />
    );
    return {
      headerRight,
      title: 'Puyallup FHC Kids'
    };
  };

  render() {
    const {navigate} = this.props.navigation;
    let gamesMarkup = games.map((gameObj, idx) => <Card {...gameObj.props} key={'game-card-' + idx} onPress={() => navigate(gameObj.route)}/>);
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>{gamesMarkup}</View>
      </ScrollView>
    );
  }
}
