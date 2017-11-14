import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import User from './User';
import Modal from '../Shared/Modal';
import { screenStyles as styles } from './Styles';
import { BACKGROUND_COLOR_CONFIRM, BACKGROUND_COLOR_CANCEL } from '../Styles';

import { SEND_WEBSOCKET } from '../../actions';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Select User'
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetchingUsers) {
      SEND_WEBSOCKET('list-current-users');
    }
    if (!this.props.userData && nextProps.userData) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'})
        ]
      });
      this.props.navigation.dispatch(resetAction);
    } else if (this.props.userData && !nextProps.userData) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login'})
        ]
      });
      this.props.navigation.dispatch(resetAction);
    }
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

  handleLogin(id) {
    SEND_WEBSOCKET('login ' + id + ' ' + this.state.userPin);
  }

  handleLogout() {
    console.log("LOGOUT TIME");
    SEND_WEBSOCKET('logout ' + this.props.userData.token);
  }

  render() {
    if (this.props.fetchingUsers) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }

    let welcomeView;
    if (this.state.selectedUser) {
      let selectedUserObj = this.props.userList.find(user => user.id === this.state.selectedUser);
      welcomeView = (
        <Modal title={'Welcome ' + selectedUserObj.name} onClose={this.closeWelcomeScreen.bind(this)} animate={true}>
          <View style={styles.modalView}>
          <View style={styles.inputWrapper}>
            <Text style={styles.modalBody}>Please enter your pin:</Text>
            <TextInput style={styles.modalInput} onChangeText={userPin => this.setState({userPin})}/>
          </View>
          <View style={styles.buttonWrapper}>
            <Button title='Login' buttonStyle={styles.loginButton} backgroundColor={BACKGROUND_COLOR_CONFIRM} onPress={this.handleLogin.bind(this, selectedUserObj.id)}/>
            <Button title='Logout' buttonStyle={styles.loginButton} backgroundColor={BACKGROUND_COLOR_CANCEL} onPress={this.handleLogout.bind(this)}/>
          </View>
          </View>
        </Modal>
      );
    }

    let loggedInString = this.props.userData ? ('Currently logged in as ' + this.props.userData.name) : 'Currently no user logged in';
    console.log(this.props.userData);
    let currentUserView = (
      <View style={styles.userHeader}>
        <Text style={styles.userTitle}>{loggedInString}</Text>
      </View>
    );

    let userList = this.props.userList.map((user, idx) => {
      return {
        key: 'usr-' + idx,
        ...user
      };
    });

    let listMarkup;
    if (userList.length) {
      listMarkup = (
        <FlatList
          data={userList}
          renderItem={({item}) => <User name={item.name} id={item.id} onTap={this.handleUserSelect.bind(this)}/>}
          style={styles.list}
        />
      );
    } else {
      listMarkup = (
        <Text style={styles.noUsers}>No users found</Text>
      );
    }

    return (
      <View style={styles.container}>
        {currentUserView}
        <Text style={styles.avaliableUsers}>Avaliable Users:</Text>
        {listMarkup}
        {welcomeView}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { fetchingUsers, userList, userData } = state.auth;
  const { websocketConnected } = state.app;
  return {
    fetchingUsers,
    userList,
    userData,
    websocketConnected
  }
}

export default connect(mapStateToProps)(LoginScreen)
