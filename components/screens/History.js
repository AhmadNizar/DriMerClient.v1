import React from 'react'
import {
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native'
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts'

class History extends React.Component {
  static navigationOptions = {
    title: "History"
  }

  constructor(){
    super()
    this.state = {
      historyUser: [],
      dataUser: []
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
        const newDataUser = []
        const lastStep = 0
        historyUser.map((dataUser, index) => {
          if(index < 25) {
            newDataUser.push(dataUser.step - lastStep)
            lastStep = dataUser.step
          }
        })
        console.log(newDataUser)
        this.setState({
          historyUser: historyUser,
          dataUser: newDataUser
        })
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  }

  componentDidMount () {
    this.getAsync()
  }

  render(){
    const barData = [
      {
        values: this.state.dataUser,
        positive: {
            fill: 'rgb(134, 65, 244)',
        },
        negative: {
            fill: 'rgba(134, 65, 244, 0.2)',
        },
      },
    ]
    const contentInset = { top: 20, bottom: 20 }
    return (
      <View style={{ marginTop: 10, marginLeft: 10, marginLeft: 10, marginBottom: 10 }}>
        <Text>
          Step / Hour(s)
        </Text>
        <View style={ { height: 200, width: 330, marginTop: 10 } }>
          <YAxis
            style={ { marginBottom: -2, position: 'absolute', top: 0, bottom: 0, transform: [ { translateY: -5 } ] } }
            dataPoints={ this.state.dataUser }
            contentInset={ { top: 10, bottom: 10 } }
          />
          <BarChart
            style={ { flex: 1 } }
            data={ barData }
          />
          <XAxis
            style={ { paddingVertical: 0 } }
            values={ this.state.dataUser }
            formatLabel={ (value, index) => {
              if(index == 0 ||index % 2 !== 0) {
                return ' '
              } else {
                return index
              }
            } }
            chartType={ XAxis.Type.BAR }
            labelStyle={ { color: 'grey' } }
          />
        </View>
        <Button
          onPress={this.getAsync}
          title="get step data"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    )
  }
}

export default History
