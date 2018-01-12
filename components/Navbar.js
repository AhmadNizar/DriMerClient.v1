import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView, TextInput } from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav'

export default class Navbar extends React.Component {
  render() {
    return (
      <NavBar style={styles}>

        <NavButton>
          <NavButtonText style={styles.buttonText}>
            {"Setting"}
          </NavButtonText>
        </NavButton>
        <NavButton>
          <NavButtonText style={styles.buttonText}>
            {"Tap Bottle"}
          </NavButtonText>
        </NavButton>
        <NavButton>
          <NavButtonText style={styles.buttonText}>
            {"Profile"}
          </NavButtonText>
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