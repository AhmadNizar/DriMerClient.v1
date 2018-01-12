import React from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, AsyncStorage } from "react-native";
import {connect} from 'react-redux'
import {changeLogout} from '../../actions/userAction'
import {changeVisible} from '../../actions/userAction'

class Dashboard extends React.Component {
  static navigationOptions = {
    title: "Dashboard"
  }

  logout = () => {
    AsyncStorage.removeItem('drimerToken').then(() => {
      this.props.changeLogout()
    })
  }

  componentDidMount() {
    AsyncStorage.getItem('drimerToken').then((value) => {
      console.log(value)
    })
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

const mapActionToProps = (dispatch) => {
  return {
    changeLogout: () => dispatch(changeLogout()),
    changeVisible: () => dispatch(changeVisible())
  }
}

export default connect(null, mapActionToProps)(Dashboard)