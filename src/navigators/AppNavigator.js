import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../components/Login/Screen';
import HomeScreen from '../components/Home/Screen';
import CoatOfArmsScreen from '../components/CoatOfArms/Screen';
import ColoringScreen from '../components/Coloring/Screen';
import HangmanScreen from '../components/Hangman/Screen';
import MemoryScreen from '../components/Memory/Screen';
import PuzzleScreen from '../components/Puzzle/Screen';
import QuizScreen from '../components/Quiz/Screen';
import StatsScreen from '../components/Stats/Screen';
import StoriesScreen from '../components/Stories/Screen';
import TilesScreen from '../components/Tiles/Screen';

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  CoatOfArms: { screen: CoatOfArmsScreen },
  Coloring: { screen: ColoringScreen },
  Hangman: { screen: HangmanScreen },
  Memory: { screen: MemoryScreen },
  Puzzle: { screen: PuzzleScreen },
  Quiz: { screen: QuizScreen },
  Stats: { screen: StatsScreen },
  Stories: { screen: StoriesScreen },
  Tiles: { screen: TilesScreen }
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);