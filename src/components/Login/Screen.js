import React from 'react';
import { connect } from 'react-redux';
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
    if (!this.props.userToken && nextProps.userToken) {
      console.log("LOGGED IN");
      console.log(this.props.navigation);
      this.props.navigation.dispatch({ type: 'Home' })
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
    SEND_WEBSOCKET('logout ' + this.props.userToken);
  }

  render() {
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

    if (this.props.fetchingUsers) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }

    let userList = this.props.userList.map((user, idx) => {
      return {
        key: 'usr-' + idx,
        ...user
      };
    });

    return (
      <View style={styles.container}>
        <FlatList
          data={userList}
          renderItem={({item}) => <User name={item.name} id={item.id} onTap={this.handleUserSelect.bind(this)}/>}
          style={styles.list}
        />
        {welcomeView}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { fetchingUsers, userList, userToken } = state.auth;
  const { websocketConnected } = state.app;
  return {
    fetchingUsers,
    userList,
    userToken,
    websocketConnected
  }
}

export default connect(mapStateToProps)(LoginScreen)
