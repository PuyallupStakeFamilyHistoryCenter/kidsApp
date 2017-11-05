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
    flexWrap: 'wrap'
  }
});

const games = [{
  props: {
    title: 'Coat of Arms',
    img: 'http://www.mpiuk.com/images/MPI-Coat-of-Arms.png'
  },
  route: 'CoatOfArms'
}, {
  props: {
    title: 'Coloring',
    img: 'http://www.kidsdiscover.com/wp-content/uploads/2015/05/Crayons.jpg'
  },
  route: 'Coloring'
}, {
  props: {
    title: 'Hangman',
    img: 'https://images-na.ssl-images-amazon.com/images/I/511LlE%2B0JRL._SX342_QL70_.jpg'
  },
  route: 'Hangman'
}, {
  props: {
    title: 'Memory Game',
    img: 'https://h5p.org/sites/default/files/styles/medium-logo/public/logos/memory-game-icon.png?itok=bIQqHE7Y'
  },
  route: 'Memory'
}, {
  props: {
    title: 'Puzzle',
    img: 'https://media.istockphoto.com/vectors/puzzle-vector-id530088995?k=6&m=530088995&s=612x612&w=0&h=XcQtDch1EPqRF1FDda_wweDJM7rNPCSoP_3QxOip8-c='
  },
  route: 'Puzzle'
}, {
  props: {
    title: 'Quiz',
    img: 'https://lh3.googleusercontent.com/4QzQJl3fgS3EmyjPuhkO32kxTY9vZx-43h1tjcx1mqhsjO6XtZag_F0tqPdY1gnsWv1W8i6893zpBzX_x6jC0w'
  },
  route: 'Quiz'
}, {
  props: {
    title: 'Statistics',
    img: 'http://alifeofproductivity.com/wp-content/uploads/2013/06/stat.001.jpg'
  },
  route: 'Stats'
}, {
  props: {
    title: 'Stories',
    img: 'http://coolerinsights.com/wp-content/uploads/2015/09/How-to-tell-winning-brand-stories-on-social-media.jpg'
  },
  route: 'Stories'
}, {
  props: {
    title: 'Tile Game',
    img: 'https://geeksretreat.files.wordpress.com/2013/03/game-board-html5.png'
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
      title: "Puyallup FHC Kids"
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
