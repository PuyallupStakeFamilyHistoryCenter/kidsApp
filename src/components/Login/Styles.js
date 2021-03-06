import { StyleSheet } from 'react-native';
import {
  BORDER_COLOR_DARK,
  BORDER_RADIUS,
  BORDER_WIDTH,
  FONT_SIZE_M,
  HEADER_2,
  MARGIN_XS,
  MARGIN_M,
  MARGIN_XXL,
  SCREEN_CONTAINER
} from '../Styles';

export const screenStyles = StyleSheet.create({
  container: SCREEN_CONTAINER,
  list: {
    width: '100%'
  },
  modalView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '70%',
    height: 35
  },
  modalBody: {
    flex: 1,
    fontSize: FONT_SIZE_M,
    textAlign: 'right',
    fontWeight: 'bold',
    height: '100%',
    lineHeight: 33
  },
  modalInput: {
    flex: 2,
    height: '100%',
    borderColor: BORDER_COLOR_DARK,
    borderBottomWidth: BORDER_WIDTH,
    marginLeft: MARGIN_XS
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: MARGIN_XXL,
    width: '100%'
  },
  loginButton: {
    flex: 1,
    borderRadius: BORDER_RADIUS,
    width: 200
  }
});

export const userStyles = StyleSheet.create({
  container: {
    borderBottomWidth: BORDER_WIDTH,
    width: '100%'
  },
  name: {
    ...HEADER_2,
    padding: MARGIN_M
  }
});
