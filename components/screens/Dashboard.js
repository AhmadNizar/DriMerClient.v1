import React from "react";
import { StyleSheet, ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity, Dimensions, AsyncStorage } from "react-native";
import Navbar from '../Navbar'

export default class Dashboard extends React.Component {
  static navigationOptions = {
    title: "Dashboard"
  }

  logout = async () => {
    await AsyncStorage.removeItem('drimerToken')
  }


  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text> Dashboard </Text>
          <Button
            title="Logout"
            onPress={() => {
              this.logout()
            }}
          />
        </ScrollView>
        <View style={styles.navbar}>
          <Navbar navigate = { navigate }/>
        </View>
      </View>
    );
  }
}

const fullWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 30,
  },
  navbar: {
    width: fullWidth
  }
})
