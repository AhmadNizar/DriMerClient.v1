import React from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";

export default class Dashboard extends React.Component {
  static navigationOptions = {
    title: "Dashboard"
  }


  render() {
    return (
      <View style={styles.container}>
        <Text> Dashboard </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    paddingTop: 30
  }
})