import React from "react";
import { StyleSheet, ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity, Dimensions, AsyncStorage } from "react-native";
import Navbar from '../Navbar'
import { connect } from 'react-redux'
import { Icon, SocialIcon } from 'react-native-elements'
import { changeLogout } from '../../actions/userAction'
import { changeVisible } from '../../actions/userAction'
import { clearSuggestion } from "../../actions/quisionerAction";
import jwtDecode from 'jwt-decode'

class Dashboard extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Dashboard',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name='user'
        type="font-awesome"
        color='#06a887' />
    ),
  }
  constructor() {
    super()

    this.state = {
      token: '',
      name: '',
      email: '',
      age: 0,
      gender: ''
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('drimerToken')
      .then((value) => {
        this.setState({
          token: value
        })
        this.getDataUser(this.state.token)
      })
      .catch((reason) => {
        console.log(reason)
      })
  }

  getDataUser(token) {
    let dataUser = jwtDecode(token).userData
    this.setState({
      name: dataUser.name,
      email: dataUser.email,
      age: dataUser.age,
      gender: dataUser.gender
    })
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

      AsyncStorage.removeItem('persentaseAir').then(() => {
        console.log('hapus persentase air')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentWillUnmount() {
    this.props.clearSuggestion()
  }

  render() {
    console.log("Hai, hai, hai", this.state.token)
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.user}>
          <Icon
            name='user-circle-o'
            type='font-awesome'
            size={130}
            color='white'

          />
          <View style={styles.textView}>
            <Text style={styles.userDetail}>{this.state.name}</Text>
            <Text style={styles.userDetail}>{this.state.age} years old</Text>
            <Text style={styles.userDetail}>{this.state.email}</Text>
          </View>
        </View>
        <View style={styles.socialIcon}>
          <SocialIcon
            style={{ backgroundColor: '#06a887' }}
            button
            type="sign-out"
            title="Logout"
            onPress={() => {
              this.logout()
            }}
          />
        </View>
      </View>
    );
  }
}

const fullWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#296666',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 30,
  },
  socialIcon: {
    width: 200
  },
  user: {
    alignItems: 'center',
    width: fullWidth,
    borderRadius: 35,
    paddingTop: 10,
    paddingBottom: 10
  },
  userDetail: {
    color: 'white',
    marginTop: 5,
  },
  textView: {
    marginTop: 15,
    alignItems: 'center'
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
