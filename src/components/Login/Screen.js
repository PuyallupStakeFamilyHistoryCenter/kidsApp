import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements'
import User from './User';
import Modal from '../Shared/Modal';
import { screenStyles as styles } from './Styles';
import { BACKGROUND_COLOR_CONFIRM, BACKGROUND_COLOR_CANCEL } from '../Styles';

import { writeToSocket } from '../../actions';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Select User'
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   console.log("$$$$");
  //   console.log(this.props.dispatch);
  //   console.log(writeToSocket)
  //   this.props.dispatch(writeToSocket());
  // }

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
            <Button title='Login' buttonStyle={styles.loginButton} backgroundColor={BACKGROUND_COLOR_CONFIRM}/>
            <Button title='Logout' buttonStyle={styles.loginButton} backgroundColor={BACKGROUND_COLOR_CANCEL}/>
          </View>
          </View>
        </Modal>
      );
    }

    if (this.props.fetchingUsers) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large"/>
        </View>
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

const mapStateToProps = state => {
  const { fetchingUsers, isLoggedIn } = state.auth;
  return {
    fetchingUsers,
    isLoggedIn
  }
}

export default connect(mapStateToProps)(LoginScreen)
