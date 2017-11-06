import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Card from './Card';

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});

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
        color="#000"
        icon={{name: 'user', type: 'font-awesome', color: '#000'}}
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
