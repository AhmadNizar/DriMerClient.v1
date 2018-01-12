import React from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

class Profile extends React.Component {
  static navigationOptions = {
    title: "Profile"
  }

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <View style = { styles.container }>
        <View style = {{ marginLeft: 20 }}>
          <Text>This is Profile</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 30
  }
})

const mapStateToProps = (state) => {
  return {

  }
}

const mapActionToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapActionToProps)(Profile)
