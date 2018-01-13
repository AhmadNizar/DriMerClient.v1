import React from "react";
import { StyleSheet, ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity, Dimensions, AsyncStorage } from "react-native";
import Navbar from '../Navbar'
import { connect } from 'react-redux'
import { changeLogout } from '../../actions/userAction'
import { changeVisible } from '../../actions/userAction'

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

const mapActionToProps = (dispatch) => {
  return {
    changeLogout: () => dispatch(changeLogout()),
    changeVisible: () => dispatch(changeVisible())
  }
}

export default connect(null, mapActionToProps)(Dashboard)
