import React from "react";
import { StyleSheet, ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity, Dimensions, AsyncStorage } from "react-native";
import Navbar from '../Navbar'
import { connect } from 'react-redux'
import { changeLogout } from '../../actions/userAction'
import { changeVisible } from '../../actions/userAction'
import { clearSuggestion } from "../../actions/quisionerAction";

class Dashboard extends React.Component {
  static navigationOptions = {
    title: "Dashboard"
  }

  logout = () => {

    AsyncStorage.removeItem('drimerToken').then(() => {
      this.props.changeLogout()
    })
    .catch((err) => {
      console.log(err)
    })

    AsyncStorage.removeItem('air').then(() => {
      console.log('hapus air')
    })
    .catch((err) => {
      console.log(err)
    })

    AsyncStorage.removeItem('persen').then(() => {
      console.log('hapus air')
    })
    .catch((err) => {
      console.log(err)
    })    
  }

  componentWillUnmount() {
    this.props.clearSuggestion()
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

const mapStateToProps = (state) => {
  return {
    waterNeed: state.quisionerReducer.waterNeeds
  }
}

const mapActionToProps = (dispatch) => {
  return {
    changeLogout: () => dispatch(changeLogout()),
    changeVisible: () => dispatch(changeVisible()),
    clearSuggestion: () => dispatch(clearSuggestion())
  }
}

export default connect(mapStateToProps, mapActionToProps)(Dashboard)
