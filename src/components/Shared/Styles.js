import { Dimensions, StyleSheet } from 'react-native';
import {
  BACKGROUND_COLOR_LIGHT,
  BACKGROUND_TRANSPARENT_DARK,
  BORDER_COLOR_DARK,
  BORDER_RADIUS,
  BORDER_WIDTH,
  HEADER_1,
  MARGIN_XS,
  MARGIN_M,
  MARGIN_XL,
  SCREEN_CONTAINER
} from '../Styles';

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: BACKGROUND_TRANSPARENT_DARK
  },
  modal: {
    backgroundColor: BACKGROUND_COLOR_LIGHT,
    borderRadius: BORDER_RADIUS,
    maxHeight: Dimensions.get('window').height - (Dimensions.get('window').height * .2),
    minHeight: 100,
    width: Dimensions.get('window').width - (Dimensions.get('window').width * .2)
  },
  title: {
    ...HEADER_1,
    textAlign: 'center',
    marginTop: MARGIN_XS,
    marginBottom: MARGIN_XS
  },
  body: {
    margin: MARGIN_M
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    marginRight: -MARGIN_XL
  }
});
