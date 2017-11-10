import { Dimensions, StyleSheet } from 'react-native';
import {
  BACKGROUND_COLOR_LIGHT,
  BACKGROUND_IMAGE,
  BACKGROUND_TRANSPARENT_DARK,
  BORDER_COLOR_DARK,
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_COLOR_LIGHT,
  HEADER_1,
  MARGIN_M,
  SCREEN_CONTAINER
} from '../Styles';

export const screenStyles = StyleSheet.create({
  container: {
    ...SCREEN_CONTAINER,
    flexDirection: 'column',
    flexWrap: 'wrap'
  }
});

export const cardStyles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR_LIGHT,
    borderRadius: BORDER_RADIUS,
    borderWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR_DARK,
    margin: MARGIN_M,
    height: Dimensions.get('window').height / 2 - 60,
    width: Dimensions.get('window').height / 2 - 60
  },
  backgroundImage: {
    ...BACKGROUND_IMAGE,
    resizeMode: 'cover'
  },
  title: {
    ...HEADER_1,
    backgroundColor: BACKGROUND_TRANSPARENT_DARK,
    color: FONT_COLOR_LIGHT,
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});
