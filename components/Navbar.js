import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView, TextInput } from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { Icon } from 'react-native-elements';

export default class Navbar extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <NavBar style={styles}>
        <NavButton>
          <Icon
            name='cog'
            type="font-awesome"
            color="white"
          />
        </NavButton>
        <NavButton>
          <Icon
            name='plus-circle'
            type="font-awesome"
            color="white"
          />
        </NavButton>
        <NavButton
          onPress={() => this.props.navigate('Profile')}
        >
          <Icon
            name='user-circle'
            type="font-awesome"
            color="white"
          />
        </NavButton>
      </NavBar>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: 'rgb(72, 111, 145)',
    height: 7
  },
  navBar: {
    backgroundColor: 'rgb(72, 111, 145)'
  },
  buttonText: {
    color: 'white'
  },
})
