import React from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, AsyncStorage } from "react-native";

export default class Dashboard extends React.Component {
  static navigationOptions = {
    title: "Dashboard"
  }

  logout = async () => {
    await AsyncStorage.removeItem('drimerToken')
  }


  render() {
    return (
      <View style={styles.container}>
        <Text> Dashboard </Text>
        <Button
        title="Logout"
        onPress={() => {
         this.logout()
        }}
         />
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