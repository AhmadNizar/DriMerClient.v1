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
import { changeLogout } from './actions/userAction'
import { changeVisible } from './actions/userAction'

import Quisioner from './components/screens/Quisioner';
import Register from './components/screens/Register';
import Login from './components/screens/Login';
import Dashboard from './components/screens/Dashboard';
import Suggestion from './components/screens/Suggestion';
import Profile from './components/screens/Profile';
import History from './components/screens/History';

const NavigationBase = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  Quisioner: { screen: Quisioner },
})

const NavigationTab = TabNavigator({
  Suggestion: { screen: Suggestion },
  Profile: { screen: Profile },
  History: { screen: History }
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      backBehavior: 'none',
      showIcon: true,
      showLabel: true,
      labelStyle: {
        fontSize: 12,
        color: '#06a887'
      },
      style: {
        backgroundColor: '#ffffff',
        height: 60
      }
    }
  })

class App extends Component<{}> {

  constructor() {
    super()
    this.state = {
      token: ''
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('drimerToken').then((value) => {
      console.log('yeah kena di app')
      console.log(value)
      if (value) {
        this.props.changeVisible()
      }
    })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    if (this.props.userLoginRegisterVisible != '') {
      return [<NavigationTab key={Math.random()} />]
    } else {
      return [<NavigationBase key={Math.random()} />]
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

const mapActionsToProps = (dispatch) => {
  return {
    changeLogout: () => dispatch(changeLogout()),
    changeVisible: () => dispatch(changeVisible())
  }
}

export default connect(mapStateToProps, mapActionsToProps)(App)
