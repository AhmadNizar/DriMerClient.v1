import React from 'react'
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import {
  PieChart,
  BarChart,
  XAxis,
  YAxis
} from 'react-native-svg-charts'
import { Icon } from 'react-native-elements'


class History extends React.Component {
  static navigationOptions = {
    title: "History",
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name='bar-chart'
        type="font-awesome"
        color='#06a887' />
    ),
  }

  constructor() {
    super()
    this.state = {
      historyUser: [],
      userStep: [],
      userDrink: [],
      userStatus: []
    }
    this.setAsync = this.setAsync.bind(this)
    this.getAsync = this.getAsync.bind(this)
  }

  setAsync = async () => {
    try {
      const stringData = JSON.stringify({ name: ['Belalang', 'Capung'] })
      await AsyncStorage.setItem('@History:today', stringData);
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  }

  getAsync = async () => {
    try {
      const historyUserRaw = await AsyncStorage.getItem('@History:user');
      if (historyUserRaw !== null) {
        // We have data!!
        // console.log(historyUserRaw);
        const historyUser = JSON.parse(historyUserRaw)
        const newUserStep = []
        const newUserDrink = []
        const newUserStatus = []
        const totalSleep = 0
        const totalSit = 0
        const totalWalk = 0
        const lastStep = 0
        const lastDrink = 0
        historyUser.map((dataUser, index) => {
          if (index < 25) {
            newUserStep.push(dataUser.step - lastStep)
            newUserDrink.push(dataUser.drink - lastDrink)
            lastStep = dataUser.step
            lastDrink = dataUser.drink
            if (dataUser.status == 'walk/run') {
              totalWalk += 1
            } else if (dataUser.status == 'rest/sleep') {
              totalSleep += 1
            } else {
              totalSit += 1
            }
          }
          if (index == 25) {
            //set to async
            newUserStatus = [totalWalk, totalSleep, totalSit]
          }
        })
        console.log(newUserStatus)
        this.setState({
          historyUser: historyUser,
          userStep: newUserStep,
          userDrink: newUserDrink,
          userStatus: newUserStatus
        })
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  }

  componentDidMount() {
    this.getAsync()
  }

  render() {
    const stepData = [
      {
        values: this.state.userStep,
        positive: {
          fill: 'rgb(97, 154, 244)',
        },
      },
    ]
    const drinkData = [
      {
        values: this.state.userDrink,
        positive: {
          fill: 'rgb(97, 154, 244)',
        },
      },
    ]

    const dataChart = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
    const pieData = this.state.userStatus
      .filter(value => value > 0)
      .map((value, index) => {
        let color = 'blue'
        if (index == 0) {
          //walk
          color = 'red'
        } else if (index == 1) {
          //sit
          color = 'green'
        } else {
          //sit
          color = 'blue'
        }
        return {
          value,
          color: color,
          key: `pie-${index}`,
        }
      })
    console.log(pieData)

    return (
      <View style={{
        marginTop: 10,
        marginLeft: 10,
        marginLeft: 10,
        marginBottom: 10
      }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={{
            backgroundColor: 'white',
            paddingLeft: 5,
            paddingTop: 5,
            paddingRight: 5,
            width: 340,
            marginBottom: 10
          }}
          >
            <Text>
              Step / Hour - (Saturday: 13 January 2017)
            </Text>
            <View style={{ height: 200, width: 330, marginTop: 10 }}>
              <YAxis
                style={{ marginBottom: -2, position: 'absolute', top: 0, bottom: 0, transform: [{ translateY: -5 }] }}
                dataPoints={this.state.userStep}
                contentInset={{ top: 10, bottom: 10 }}
              />
              <BarChart
                style={{ flex: 1, marginLeft: 25 }}
                data={stepData}
              />
              <XAxis
                style={{ paddingVertical: 0, marginLeft: 25 }}
                values={this.state.userStep}
                formatLabel={(value, index) => {
                  if (index % 2 !== 0) {
                    return ' '
                  } else {
                    return index
                  }
                }}
                chartType={XAxis.Type.BAR}
                labelStyle={{ color: 'grey' }}
              />
            </View>
          </View>
          <View style={{
            backgroundColor: 'white',
            paddingLeft: 5,
            paddingTop: 5,
            paddingRight: 5,
            width: 340,
            marginBottom: 10
          }}
          >
            <Text>
              Drink(liter drink) / Hour - (Saturday: 13 January 2017)
            </Text>
            <View style={{ height: 200, width: 330, marginTop: 10 }}>
              <YAxis
                style={{ marginBottom: -2, position: 'absolute', top: 0, bottom: 0, transform: [{ translateY: -5 }] }}
                dataPoints={this.state.userDrink}
                contentInset={{ top: 10, bottom: 10 }}
              />
              <BarChart
                style={{ flex: 1, marginLeft: 25 }}
                data={drinkData}
              />
              <XAxis
                style={{ paddingVertical: 0, marginLeft: 25 }}
                values={this.state.userDrink}
                formatLabel={(value, index) => {
                  if (index % 2 !== 0) {
                    return ' '
                  } else {
                    return index
                  }
                }}
                chartType={XAxis.Type.BAR}
                labelStyle={{ color: 'grey' }}
              />
            </View>
          </View>
          <View style={{
            backgroundColor: 'white',
            paddingLeft: 5,
            paddingTop: 5,
            paddingRight: 5,
            width: 340,
            marginBottom: 10
          }}
          >
            <Text>
              Activity - (Saturday: 13 January 2017)
          </Text>
            <Text>
              red: walk, green: sleep, blue: sit
          </Text>
            <PieChart
              style={{ height: 200, marginTop: 10, marginBottom: 10 }}
              data={pieData}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 0
  }
})

export default History
