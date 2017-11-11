import { StyleSheet } from 'react-native';
import {
  BACKGROUND_IMAGE,
  BACKGROUND_COLOR_LIGHT,
  BACKGROUND_TRANSPARENT_DARK,
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_COLOR_LIGHT,
  FONT_SIZE_M,
  HEADER_2,
  MARGIN_S,
  MARGIN_M,
  SCREEN_CONTAINER
} from '../Styles';

export const screenStyles = StyleSheet.create({
  container: SCREEN_CONTAINER,
  subTitle: {
    ...HEADER_2,
    marginLeft: MARGIN_M,
    marginTop: MARGIN_M
  },
  bodyText: {
    fontSize: FONT_SIZE_M,
    marginLeft: MARGIN_M
  },
  board: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%'
  },
  winner: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND_TRANSPARENT_DARK,
    position: 'absolute'
  },
  winnerText: {
    color: FONT_COLOR_LIGHT,
    fontSize: 300,
    textAlign: 'center'
  }
});

export const cardStyles = StyleSheet.create({
  container: {
    padding: MARGIN_S
  },
  flipCard: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR_LIGHT,
    backfaceVisibility: 'hidden',
    borderWidth: BORDER_WIDTH,
    borderRadius: BORDER_RADIUS
  },
  flipCardBack: {
    position: 'absolute',
    top: 0
  },
  backgroundImage: BACKGROUND_IMAGE
});
