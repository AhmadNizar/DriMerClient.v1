/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import store from './store'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

import Quisioner from './components/screens/Quisioner';
import Register from './components/screens/Register';
import Login from './components/screens/Login';
import Dashboard from './components/screens/Dashboard';
import Suggestion from './components/screens/Suggestion';


const NavigationBase = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  Quisioner: { screen: Quisioner }
})

const NavigationTab = TabNavigator({
  Suggestion: { screen: Suggestion },
  Dashboard: { screen: Dashboard }
})

class App extends Component<{}> {

  constructor() {
    super()
    this.state = {
      token: ''
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('drimerToken').then((value) => this.setState({ token: value }))
  }

  render() {
    console.log(this.state.token)
    if (this.props.userLoginRegisterVisible != '' || this.state.token == null) {
      return [<NavigationBase key={Math.random()} />]
    } else {
      return [<NavigationTab key={Math.random()} />]
    }
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    userLoginRegisterVisible: state.userReducer.userLoginRegisterVisible
  }
}

export default connect(mapStateToProps, null)(App)