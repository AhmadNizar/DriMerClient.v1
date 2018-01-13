import React from 'react'
import {
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native'

class History extends React.Component {
  constructor(){
    super()
    this.state = {
      name: 'Capung'
    }

    this.setAsync = this.setAsync.bind(this)
    this.getAsync = this.getAsync.bind(this)
  }

  setAsync = async () => {
    try {
      const stringData = JSON.stringify({name: ['Belalang', 'Capung']})
      await AsyncStorage.setItem('@History:today', stringData);
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  }

  getAsync = async () => {
    try {
      const value = await AsyncStorage.getItem('@History:today');
      console.log(value)
      if (value !== null){
        // We have data!!
        // console.log(value);
        // this.setState({
        //   name: value
        // })
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  }

  render(){
    return (
      <View>
        <Text>This is History: { this.state.name }</Text>
        <Button
          onPress={this.setAsync}
          title="set AsyncStorage"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.getAsync}
          title="get AsyncStorage"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    )
  }
}

export default History
