import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements'
import User from './User';
import Modal from '../Shared/Modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
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
    fontSize: 16,
    textAlign: 'right',
    fontWeight: 'bold',
    height: '100%',
    lineHeight: 33
  },
  modalInput: {
    flex: 2,
    height: '100%',
    borderColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 5,
    borderRadius: 4
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    width: '100%'
  },
  loginButton: {
    flex: 1,
    borderRadius: 3,
    width: 200
  }
});

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Log In'
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleUserSelect(id) {
    this.setState({
      selectedUser: id
    });
  }

  closeWelcomeScreen() {
    this.setState({
      selectedUser: undefined
    });
  }

  render() {
    let welcomeView;
    if (this.state.selectedUser) {
      welcomeView = (
        <Modal title={'Welcome ' + this.state.selectedUser} onClose={this.closeWelcomeScreen.bind(this)} animate={true}>
          <View style={styles.modalView}>
          <View style={styles.inputWrapper}>
            <Text style={styles.modalBody}>Please enter your pin:</Text>
            <TextInput style={styles.modalInput}/>
          </View>
          <View style={styles.buttonWrapper}>
            <Button title='Login' buttonStyle={styles.loginButton} backgroundColor="#2B97F0"/>
            <Button title='Logout' buttonStyle={styles.loginButton} backgroundColor="#ff4d4d"/>
          </View>
          </View>
        </Modal>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={[{name: 'User a', key: 'user-1', id: 1}, {name: 'User b', key: 'user-2', id: 2}, {name: 'User c', key: 'user-3', id: 3}, {name: 'User d', key: 'user-4', id: 4}, {name: 'User e', key: 'user-5', id: 5}, {name: 'User f', key: 'user-6', id: 6}, {name: 'User g', key: 'user-7', id: 7}, {name: 'User h', key: 'user-8', id: 8}, {name: 'User i', key: 'user-9', id: 9}, {name: 'User j', key: 'user-10', id: 10}]}
          renderItem={({item}) => <User name={item.name} id={item.id} onTap={this.handleUserSelect.bind(this)}/>}
          style={styles.list}
        />
        {welcomeView}
      </View>
    );
  }
}
