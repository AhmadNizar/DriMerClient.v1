import React from 'react'
import {
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native'
import { BarChart, XAxis } from 'react-native-svg-charts'

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
    const data    = [ 14, -1, 100, -95, -94, -24, -8, 85, -91, 35, -53, 53, -78, 66, 96, 33, -26, -32, 73, 8 ]
      const barData = [
        {
          values: data,
          positive: {
              fill: 'rgb(134, 65, 244)',
          },
          negative: {
              fill: 'rgba(134, 65, 244, 0.2)',
          },
        },
      ]
    return (
      <View>
        <View style={ { height: 200 } }>
          <BarChart
            style={ { flex: 1 } }
            data={ barData }
          />
          <XAxis
            style={ { paddingVertical: 16 } }
            values={ data }
            formatLabel={ (value, index) => index }
            chartType={ XAxis.Type.BAR }
            labelStyle={ { color: 'grey' } }
          />
        </View>
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
