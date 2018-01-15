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
      userStatus: [],
      dateGraphHistory: '',
      diffrentDate: 1
    }
    this.setHistory = this.setHistory.bind(this)
    this.getHistory = this.getHistory.bind(this)
    this.substractDate = this.substractDate.bind(this)
    this.addDate = this.addDate.bind(this)
  }

  setHistory = async () => {
    try {
      console.log('set history')
      const dummy = [
        {
          "date": "Sat Jan 13 2018 00:00:00 GMT+0700 (WIB)",
          "step": 0,
          "status": "rest/sleep",
          "drink": 0
        },
        {
          "date": "Sat Jan 13 2018 01:00:00 GMT+0700 (WIB)",
          "step": 0,
          "status": "rest/sleep",
          "drink": 0
        },
        {
          "date": "Sat Jan 13 2018 02:00:00 GMT+0700 (WIB)",
          "step": 0,
          "status": "rest/sleep",
          "drink": 0
        },
        {
          "date": "Sat Jan 13 2018 03:00:00 GMT+0700 (WIB)",
          "step": 0,
          "status": "rest/sleep",
          "drink": 0
        },
        {
          "date": "Sat Jan 13 2018 04:00:00 GMT+0700 (WIB)",
          "step": 0,
          "status": "rest/sleep",
          "drink": 0
        },
        {
          "date": "Sat Jan 13 2018 05:00:00 GMT+0700 (WIB)",
          "step": 0,
          "status": "rest/sleep",
          "drink": 0
        },
        {
          "date": "Sat Jan 13 2018 06:00:00 GMT+0700 (WIB)",
          "step": 0,
          "status": "rest/sit",
          "drink": 0
        },
        {
          "date": "Sat Jan 13 2018 07:00:00 GMT+0700 (WIB)",
          "step": 20,
          "status": "rest/sit",
          "drink": 0
        },
        {
          "date": "Sat Jan 13 2018 08:00:00 GMT+0700 (WIB)",
          "step": 45,
          "status": "walk/run",
          "drink": 0.24
        },
        {
          "date": "Sat Jan 13 2018 09:00:00 GMT+0700 (WIB)",
          "step": 145,
          "status": "walk/run",
          "drink": 0.48
        },
        {
          "date": "Sat Jan 13 2018 10:00:00 GMT+0700 (WIB)",
          "step": 200,
          "status": "rest/sit",
          "drink": 1.08
        },
        {
          "date": "Sat Jan 13 2018 11:00:00 GMT+0700 (WIB)",
          "step": 200,
          "status": "rest/sit",
          "drink": 1.08
        },
        {
          "date": "Sat Jan 13 2018 12:00:00 GMT+0700 (WIB)",
          "step": 200,
          "status": "rest/sit",
          "drink": 1.08
        },
        {
          "date": "Sat Jan 13 2018 13:00:00 GMT+0700 (WIB)",
          "step": 355,
          "status": "rest/sit",
          "drink": 1.68
        },
        {
          "date": "Sat Jan 13 2018 14:00:00 GMT+0700 (WIB)",
          "step": 400,
          "status": "rest/sit",
          "drink": 1.68
        },
        {
          "date": "Sat Jan 13 2018 15:00:00 GMT+0700 (WIB)",
          "step": 400,
          "status": "rest/sit",
          "drink": 1.68
        },
        {
          "date": "Sat Jan 13 2018 16:00:00 GMT+0700 (WIB)",
          "step": 450,
          "status": "rest/sit",
          "drink": 1.92
        },
        {
          "date": "Sat Jan 13 2018 17:00:00 GMT+0700 (WIB)",
          "step": 500,
          "status": "rest/sit",
          "drink": 1.92
        },
        {
          "date": "Sat Jan 13 2018 18:00:00 GMT+0700 (WIB)",
          "step": 850,
          "status": "walk/run",
          "drink": 1.92
        },
        {
          "date": "Sat Jan 13 2018 19:00:00 GMT+0700 (WIB)",
          "step": 850,
          "status": "rest/sit",
          "drink": 2.06
        },
        {
          "date": "Sat Jan 13 2018 20:00:00 GMT+0700 (WIB)",
          "step": 900,
          "status": "rest/sit",
          "drink": 2.06
        },
        {
          "date": "Sat Jan 13 2018 21:00:00 GMT+0700 (WIB)",
          "step": 900,
          "status": "rest/sleep",
          "drink": 2.06
        },
        {
          "date": "Sat Jan 13 2018 22:00:00 GMT+0700 (WIB)",
          "step": 900,
          "status": "rest/sleep",
          "drink": 2.06
        },
        {
          "date": "Sat Jan 13 2018 23:00:00 GMT+0700 (WIB)",
          "step": 900,
          "status": "rest/sleep",
          "drink": 2.06
        },
        {
          "date": "Sun Jan 14 2018 00:00:00 GMT+0700 (WIB)",
          "step": 0,
          "status": "rest/sleep",
          "drink": 0
        },
        {
          "date": "Sun Jan 14 2018 01:00:00 GMT+0700 (WIB)",
          "step": 0,
          "status": "rest/sleep",
          "drink": 0
        },
        {
          "date": "Sun Jan 14 2018 02:00:00 GMT+0700 (WIB)",
          "step": 0,
          "status": "rest/sleep",
          "drink": 0
        },
        {
          "date": "Sun Jan 14 2018 03:00:00 GMT+0700 (WIB)",
          "step": 0,
          "status": "rest/sleep",
          "drink": 0
        },
        {
          "date": "Sun Jan 14 2018 04:00:00 GMT+0700 (WIB)",
          "step": 0,
          "status": "rest/sleep",
          "drink": 0
        },
        {
          "date": "Sun Jan 14 2018 05:00:00 GMT+0700 (WIB)",
          "step": 0,
          "status": "rest/sleep",
          "drink": 0
        },
        {
          "date": "Sun Jan 14 2018 06:00:00 GMT+0700 (WIB)",
          "step": 10,
          "status": "rest/sit",
          "drink": 0
        },
        {
          "date": "Sun Jan 14 2018 07:00:00 GMT+0700 (WIB)",
          "step": 30,
          "status": "walk/run",
          "drink": 0
        },
        {
          "date": "Sun Jan 14 2018 08:00:00 GMT+0700 (WIB)",
          "step": 60,
          "status": "walk/run",
          "drink": 0.24
        },
        {
          "date": "Sun Jan 14 2018 09:00:00 GMT+0700 (WIB)",
          "step": 200,
          "status": "walk/run",
          "drink": 0.48
        },
        {
          "date": "Sun Jan 14 2018 10:00:00 GMT+0700 (WIB)",
          "step": 200,
          "status": "rest/sit",
          "drink": 1.32
        },
        {
          "date": "Sun Jan 14 2018 11:00:00 GMT+0700 (WIB)",
          "step": 200,
          "status": "rest/sit",
          "drink": 1.32
        },
        {
          "date": "Sun Jan 14 2018 12:00:00 GMT+0700 (WIB)",
          "step": 500,
          "status": "rest/sit",
          "drink": 1.92
        },
        {
          "date": "Sun Jan 14 2018 13:00:00 GMT+0700 (WIB)",
          "step": 552,
          "status": "rest/sit",
          "drink": 2.36
        },
        {
          "date": "Sun Jan 14 2018 14:00:00 GMT+0700 (WIB)",
          "step": 800,
          "status": "walk/run",
          "drink": 2.36
        },
        {
          "date": "Sun Jan 14 2018 15:00:00 GMT+0700 (WIB)",
          "step": 800,
          "status": "rest/sit",
          "drink": 2.36
        },
        {
          "date": "Sun Jan 14 2018 16:00:00 GMT+0700 (WIB)",
          "step": 800,
          "status": "rest/sit",
          "drink": 2.36
        },
        {
          "date": "Sun Jan 14 2018 17:00:00 GMT+0700 (WIB)",
          "step": 800,
          "status": "rest/sit",
          "drink": 2.36
        },
        {
          "date": "Sun Jan 14 2018 18:00:00 GMT+0700 (WIB)",
          "step": 829,
          "status": "walk/run",
          "drink": 2.36
        },
        {
          "date": "Sun Jan 14 2018 19:00:00 GMT+0700 (WIB)",
          "step": 850,
          "status": "rest/sit",
          "drink": 2.36
        },
        {
          "date": "Sun Jan 14 2018 20:00:00 GMT+0700 (WIB)",
          "step": 900,
          "status": "rest/sit",
          "drink": 2.36
        },
        {
          "date": "Sun Jan 14 2018 21:00:00 GMT+0700 (WIB)",
          "step": 900,
          "status": "rest/sleep",
          "drink": 2.36
        },
        {
          "date": "Sun Jan 14 2018 22:00:00 GMT+0700 (WIB)",
          "step": 900,
          "status": "rest/sleep",
          "drink": 2.36
        },
        {
          "date": "Sun Jan 14 2018 23:00:00 GMT+0700 (WIB)",
          "step": 900,
          "status": "rest/sleep",
          "drink": 2.36
        },
      ]
      const stringData = JSON.stringify(dummy)
      await AsyncStorage.setItem('@History:user', stringData);
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  }

  clearHistory = async () => {
    try {
      AsyncStorage.removeItem('@History:user')
    } catch (error) {
      console.log(error)
    }
  }

  getHistory = async () => {
    try {
      console.log('get history')
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
        const newDateGraphHistory = ''
        let totalData = 24
        historyUser.map((dataUser, index) => {
          const dateHistory = new Date(dataUser.date)
          const today = new Date(Date.now())
          if (dateHistory.getDate() == (today.getDate() - this.state.diffrentDate)) {
            newDateGraphHistory = dateHistory
            totalData -= 1
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
          if (totalData == 0) {
            //set to async
            newUserStatus = [totalWalk, totalSleep, totalSit]
          }
        })
        this.setState({
          historyUser: historyUser,
          userStep: newUserStep,
          userDrink: newUserDrink,
          userStatus: newUserStatus,
          dateGraphHistory: `${newDateGraphHistory.toDateString()}`
        })
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  }

  substractDate() {
    this.setState({ diffrentDate: this.state.diffrentDate + 1 }, () => this.getHistory())
  }

  addDate() {
    this.setState({ diffrentDate: this.state.diffrentDate - 1 }, () => this.getHistory())
  }

  componentDidMount() {
    this.getHistory()
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
            paddingBottom: 5,
            width: 340,
            height: 45,
            marginBottom: 10
            }}
            >
            <View style={{ flex: 1, flexDirection: 'row'}}>
              <View style={{ width: 50 }}>
                <Button
                  onPress={ () => this.substractDate()}
                  title="➖"
                  color="#619af4"
                />
              </View>
              <View style={{ width: 230, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>{ this.state.dateGraphHistory }</Text>
              </View>
              <View style={{ width: 50 }}>
                <Button
                  onPress={ () => this.addDate()}
                  title="➕"
                  color="#619af4"
                />
              </View>
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
              Step / Hour - { this.state.dateGraphHistory }
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
            }}>
            <Text>
              Drink(liter drink) / Hour - { this.state.dateGraphHistory }
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
            }}>
            <Text>
              Activity - { this.state.dateGraphHistory }
            </Text>
            <Text>
              red: walk, green: sleep, blue: sit
            </Text>
            <PieChart
              style={{ height: 200, marginTop: 10, marginBottom: 10 }}
              data={pieData}
            />
          </View>

          <View style={{
            backgroundColor: 'white',
            paddingLeft: 5,
            paddingTop: 5,
            paddingRight: 5,
            width: 340,
            marginBottom: 10
            }}>
            <View style={{ marginBottom: 5 }}>
              <Button
                onPress={ () => this.setHistory()}
                title="Set dummy Data"
                color="#841584"
              />
            </View>
            <View style={{ marginBottom: 5 }}>
              <Button
                onPress={ () => this.clearHistory()}
                title="clear history"
                color="#841584"
              />
            </View>
            <View style={{ marginBottom: 5 }}>
              <Button
                onPress={ () => this.getHistory()}
                title="get history"
                color="#841584"
              />
            </View>
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
