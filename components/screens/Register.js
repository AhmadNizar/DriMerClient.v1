import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableOpacity, Picker, Alert } from "react-native";
import { connect } from 'react-redux'
import { actionRegister } from '../../actions/userAction'
class Register extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#F5FCFF'
    },
    title: "Register",
  }
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      age: '',
      gender: '',
      isDateTimePickerVisible: false,
      err: '',
      isLoading: false
    }
  }
  register = () => {
    this.setState({
      isLoading: true
    })
    let dataUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      age: Number(this.state.age),
      gender: this.state.gender
    }
    this.props.register(dataUser)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.isSuccess) {
      Alert.alert(
        'Success',
        'Register success',
        [
          {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
        ],
        { cancelable: false }
      )
    }
  }
  render() {
    console.log(this.props.isSuccess)
    var tunggu = <Text>Tunggu</Text>
    if(this.state.isLoading == false) {
      tunggu = <Text></Text>
    } else if(this.state.isSuccess == true) {
      tunggu = <Text></Text>
    } else {
      tunggu = <ActivityIndicator />
    }
    return (
      <View style={styles.container}>
        <Text>{this.state.err}</Text>
        {tunggu}
        <View style={{ width: 300 }}>
          <TextInput placeholder="Name" onChangeText={(text) => this.setState({ name: text })} />
          <TextInput placeholder="Email" onChangeText={(text) => this.setState({ email: text })} />
          <TextInput placeholder="Age" onChangeText={(text) => this.setState({ age: text })} />
          <View style={styles.input}>
            <Picker
              selectedValue={this.state.gender}
              onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
              <Picker.Item label="Your Gender" value="" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Male" value="Male" />
            </Picker>
          </View>
          <TextInput secureTextEntry placeholder="Password" onChangeText={(text) => this.setState({ password: text })} />
          <Button color="#0099e6" title="Register" onPress={() => this.register()} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  input: {
    borderBottomWidth: 0.3,
  },
  birthPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10
  }
})
const mapStateToProps = (state) => {
  return {
    isSuccess: state.userReducer.isSuccess
  }
}
const mapActionToProps = (dispatch) => {
  return {
    register: (userData) => { dispatch(actionRegister(userData)) }
  }
}
export default connect(mapStateToProps, mapActionToProps)(Register)