import React from 'react'
import {
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native'
import { BarChart } from 'react-native-svg-charts'

class History extends React.Component {
  constructor(){
    super()
    this.state = {
      historyUser: ''
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
      const historyUserRaw = await AsyncStorage.getItem('@History:user');
      if (historyUserRaw !== null){
        // We have data!!
        // console.log(historyUserRaw);
        const historyUser = JSON.parse(historyUserRaw)
        this.setState({
          historyUser: historyUser
        })
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  }

  render(){
    const data    = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    const barData = [
        {
            values: data,
            positive: {
                fill: fillColor,
                // other react-native-svg supported props
            },
            negative: {
                fill: fillColorNegative,
                // other react-native-svg supported props
            },
        },
    ]
    return (
      <View>
        <BarChart
          style={ { height: 200 } }
          data={ barData }
          contentInset={ { top: 30, bottom: 30 } }
        />
        <Text>{ JSON.stringify(this.state.historyUser) }</Text>
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
