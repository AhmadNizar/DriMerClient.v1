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
import Svg, {
  Rect
} from 'react-native-svg';
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
          "date" : "Mon Jan 15 2018 00:00:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 00:15:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 00:30:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 00:45:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 01:00:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 01:15:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 01:30:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 01:45:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 02:00:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 02:15:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 02:30:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 02:45:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 03:00:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 03:15:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 03:30:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 03:45:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 04:00:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 04:15:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 04:30:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 04:45:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 05:00:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 05:15:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 05:30:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 05:45:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 06:00:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 06:15:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 06:30:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 06:45:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sleep",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 07:00:00 GMT+0700 (WIB)",
          "step" : 0,
          "status" : "rest/sit",
          "drink" : 0
        }, {
          "date" : "Mon Jan 15 2018 07:15:00 GMT+0700 (WIB)",
          "step" : 20,
          "status" : "walk/run",
          "drink" : 0.24
        }, {
          "date" : "Mon Jan 15 2018 07:30:00 GMT+0700 (WIB)",
          "step" : 60,
          "status" : "walk/run",
          "drink" : 0.24
        }, {
          "date" : "Mon Jan 15 2018 07:45:00 GMT+0700 (WIB)",
          "step" : 60,
          "status" : "walk/run",
          "drink" : 0.24
        }, {
          "date" : "Mon Jan 15 2018 08:00:00 GMT+0700 (WIB)",
          "step" : 100,
          "status" : "walk/run",
          "drink" : 0.48
        }, {
          "date" : "Mon Jan 15 2018 08:15:00 GMT+0700 (WIB)",
          "step" : 100,
          "status" : "walk/run",
          "drink" : 0.48
        }, {
          "date" : "Mon Jan 15 2018 08:30:00 GMT+0700 (WIB)",
          "step" : 100,
          "status" : "walk/run",
          "drink" : 0.48
        }, {
          "date" : "Mon Jan 15 2018 08:45:00 GMT+0700 (WIB)",
          "step" : 100,
          "status" : "walk/run",
          "drink" : 0.48
        }, {
          "date" : "Mon Jan 15 2018 09:00:00 GMT+0700 (WIB)",
          "step" : 100,
          "status" : "rest/sit",
          "drink" : 0.48
        }, {
          "date" : "Mon Jan 15 2018 09:15:00 GMT+0700 (WIB)",
          "step" : 120,
          "status" : "rest/sit",
          "drink" : 0.48
        }, {
          "date" : "Mon Jan 15 2018 09:30:00 GMT+0700 (WIB)",
          "step" : 120,
          "status" : "rest/sit",
          "drink" : 0.48
        }, {
          "date" : "Mon Jan 15 2018 09:45:00 GMT+0700 (WIB)",
          "step" : 120,
          "status" : "rest/sit",
          "drink" : 0.48
        }, {
          "date" : "Mon Jan 15 2018 10:00:00 GMT+0700 (WIB)",
          "step" : 120,
          "status" : "rest/sit",
          "drink" : 1.08
        }, {
          "date" : "Mon Jan 15 2018 10:15:00 GMT+0700 (WIB)",
          "step" : 120,
          "status" : "rest/sit",
          "drink" : 1.08
        }, {
          "date" : "Mon Jan 15 2018 10:30:00 GMT+0700 (WIB)",
          "step" : 120,
          "status" : "rest/sit",
          "drink" : 1.08
        }, {
          "date" : "Mon Jan 15 2018 10:45:00 GMT+0700 (WIB)",
          "step" : 130,
          "status" : "rest/sit",
          "drink" : 1.08
        }, {
          "date" : "Mon Jan 15 2018 11:00:00 GMT+0700 (WIB)",
          "step" : 150,
          "status" : "rest/sit",
          "drink" : 1.32
        }, {
          "date" : "Mon Jan 15 2018 11:15:00 GMT+0700 (WIB)",
          "step" : 380,
          "status" : "walk/run",
          "drink" : 1.32
        }, {
          "date" : "Mon Jan 15 2018 11:30:00 GMT+0700 (WIB)",
          "step" : 502,
          "status" : "walk/run",
          "drink" : 1.32
        }, {
          "date" : "Mon Jan 15 2018 11:45:00 GMT+0700 (WIB)",
          "step" : 502,
          "status" : "rest/sit",
          "drink" : 1.32
        }, {
          "date" : "Mon Jan 15 2018 12:00:00 GMT+0700 (WIB)",
          "step" : 502,
          "status" : "rest/sit",
          "drink" : 1.32
        }, {
          "date" : "Mon Jan 15 2018 12:15:00 GMT+0700 (WIB)",
          "step" : 752,
          "status" : "walk/run",
          "drink" : 1.56
        }, {
          "date" : "Mon Jan 15 2018 12:30:00 GMT+0700 (WIB)",
          "step" : 899,
          "status" : "walk/run",
          "drink" : 1.56
        }, {
          "date" : "Mon Jan 15 2018 12:45:00 GMT+0700 (WIB)",
          "step" : 1002,
          "status" : "rest/sit",
          "drink" : 1.56
        }, {
          "date" : "Mon Jan 15 2018 13:00:00 GMT+0700 (WIB)",
          "step" : 1004,
          "status" : "rest/sit",
          "drink" : 1.56
        }, {
          "date" : "Mon Jan 15 2018 13:15:00 GMT+0700 (WIB)",
          "step" : 1200,
          "status" : "walk/run",
          "drink" : 1.56
        }, {
          "date" : "Mon Jan 15 2018 13:30:00 GMT+0700 (WIB)",
          "step" : 1250,
          "status" : "walk/run",
          "drink" : 1.8
        }, {
          "date" : "Mon Jan 15 2018 13:45:00 GMT+0700 (WIB)",
          "step" : 1250,
          "status" : "rest/sit",
          "drink" : 1.8
        }, {
          "date" : "Mon Jan 15 2018 14:00:00 GMT+0700 (WIB)",
          "step" : 1260,
          "status" : "rest/sit",
          "drink" : 1.8
        }, {
          "date" : "Mon Jan 15 2018 14:15:00 GMT+0700 (WIB)",
          "step" : 1260,
          "status" : "rest/sit",
          "drink" : 1.8
        }, {
          "date" : "Mon Jan 15 2018 14:30:00 GMT+0700 (WIB)",
          "step" : 1270,
          "status" : "rest/sit",
          "drink" : 1.8
        }, {
          "date" : "Mon Jan 15 2018 14:45:00 GMT+0700 (WIB)",
          "step" : 1280,
          "status" : "rest/sit",
          "drink" : 2.02
        }, {
          "date" : "Mon Jan 15 2018 15:00:00 GMT+0700 (WIB)",
          "step" : 1290,
          "status" : "rest/sit",
          "drink" : 2.02
        }, {
          "date" : "Mon Jan 15 2018 15:15:00 GMT+0700 (WIB)",
          "step" : 1300,
          "status" : "rest/sit",
          "drink" : 2.02
        }, {
          "date" : "Mon Jan 15 2018 15:30:00 GMT+0700 (WIB)",
          "step" : 1300,
          "status" : "rest/sit",
          "drink" : 2.02
        }, {
          "date" : "Mon Jan 15 2018 15:45:00 GMT+0700 (WIB)",
          "step" : 1300,
          "status" : "rest/sit",
          "drink" : 2.02
        }, {
          "date" : "Mon Jan 15 2018 16:00:00 GMT+0700 (WIB)",
          "step" : 1330,
          "status" : "rest/sit",
          "drink" : 2.02
        }, {
          "date" : "Mon Jan 15 2018 16:15:00 GMT+0700 (WIB)",
          "step" : 1330,
          "status" : "rest/sit",
          "drink" : 2.02
        }, {
          "date" : "Mon Jan 15 2018 16:30:00 GMT+0700 (WIB)",
          "step" : 1330,
          "status" : "rest/sit",
          "drink" : 2.02
        }, {
          "date" : "Mon Jan 15 2018 16:45:00 GMT+0700 (WIB)",
          "step" : 1330,
          "status" : "rest/sit",
          "drink" : 2.02
        }, {
          "date" : "Mon Jan 15 2018 17:00:00 GMT+0700 (WIB)",
          "step" : 1330,
          "status" : "rest/sit",
          "drink" : 2.02
        }, {
          "date" : "Mon Jan 15 2018 17:15:00 GMT+0700 (WIB)",
          "step" : 1330,
          "status" : "rest/sit",
          "drink" : 2.02
        }, {
          "date" : "Mon Jan 15 2018 17:30:00 GMT+0700 (WIB)",
          "step" : 1420,
          "status" : "walk/run",
          "drink" : 2.02
        }, {
          "date" : "Mon Jan 15 2018 17:45:00 GMT+0700 (WIB)",
          "step" : 1420,
          "status" : "rest/sit",
          "drink" : 2.24
        }, {
          "date" : "Mon Jan 15 2018 18:00:00 GMT+0700 (WIB)",
          "step" : 1450,
          "status" : "rest/sit",
          "drink" : 2.24
        }, {
          "date" : "Mon Jan 15 2018 18:15:00 GMT+0700 (WIB)",
          "step" : 1450,
          "status" : "rest/sit",
          "drink" : 2.24
        }, {
          "date" : "Mon Jan 15 2018 18:30:00 GMT+0700 (WIB)",
          "step" : 1600,
          "status" : "walk/run",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 18:45:00 GMT+0700 (WIB)",
          "step" : 1750,
          "status" : "walk/run",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 19:00:00 GMT+0700 (WIB)",
          "step" : 1750,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 19:15:00 GMT+0700 (WIB)",
          "step" : 1900,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 19:30:00 GMT+0700 (WIB)",
          "step" : 1950,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 19:45:00 GMT+0700 (WIB)",
          "step" : 1950,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 20:00:00 GMT+0700 (WIB)",
          "step" : 1950,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 20:15:00 GMT+0700 (WIB)",
          "step" : 2050,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 20:30:00 GMT+0700 (WIB)",
          "step" : 2070,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 20:45:00 GMT+0700 (WIB)",
          "step" : 2095,
          "status" : "walk/run",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 21:00:00 GMT+0700 (WIB)",
          "step" : 2355,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 21:15:00 GMT+0700 (WIB)",
          "step" : 2374,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 21:30:00 GMT+0700 (WIB)",
          "step" : 2375,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 21:45:00 GMT+0700 (WIB)",
          "step" : 2390,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 22:00:00 GMT+0700 (WIB)",
          "step" : 2400,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 22:15:00 GMT+0700 (WIB)",
          "step" : 2400,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 22:30:00 GMT+0700 (WIB)",
          "step" : 2400,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 22:45:00 GMT+0700 (WIB)",
          "step" : 2400,
          "status" : "rest/sit",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 23:00:00 GMT+0700 (WIB)",
          "step" : 2680,
          "status" : "walk/run",
          "drink" : 2.48
        }, {
          "date" : "Mon Jan 15 2018 23:15:00 GMT+0700 (WIB)",
          "step" : 2900,
          "status" : "walk/run",
          "drink" : 2.32
        }, {
          "date" : "Mon Jan 15 2018 23:30:00 GMT+0700 (WIB)",
          "step" : 2955,
          "status" : "rest/sit",
          "drink" : 2.32
        }, {
          "date" : "Mon Jan 15 2018 23:45:00 GMT+0700 (WIB)",
          "step" : 3002,
          "status" : "rest/sit",
          "drink" : 2.48
        }
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
        let avgStep = 0
        let avgStepArr = []
        let avgDrink = 0
        let avgDrinkArr = []
        let totalData = 24
        let perHour = 3
        historyUser.map((dataUser, index) => {
          const dateHistory = new Date(dataUser.date)
          const today = new Date(Date.now())
          if (dateHistory.getDate() == (today.getDate() - this.state.diffrentDate)) {
            console.log(dataUser)
            if (perHour == 0) {
              let newAvgStep = avgStep
              let newAvgDrink = avgDrink
              console.log(newAvgDrink)
              avgStep = 0
              avgDrink = 0
              avgStepArr.push(newAvgStep)
              avgDrinkArr.push(newAvgDrink)
              perHour = 3
            } else {
              console.log(dataUser.drink)
              avgStep += (dataUser.step - lastStep)
              if(dataUser.drink - lastDrink < 0) {
                avgDrink = (dataUser.drink - lastDrink) * -1
              }
              avgDrink += (dataUser.drink - lastDrink)
              perHour -= 1
            }
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
          if (historyUser.length-1 == index) {
            //set to async
            newUserStatus = [totalWalk, totalSleep, totalSit]
          }
          if (newUserStep.length == 0 && historyUser.length-1 == index) {
            console.log('userlength 0, userstep 0')
          }
        })
        console.log(avgDrinkArr)
        if (typeof newDateGraphHistory == 'string') {
          console.log('======================empty array')
          const today = new Date(Date.now())
          today.setDate(today.getDate() - 1)
          newDateGraphHistory = today
        }
        this.setState({
          historyUser: historyUser,
          userStep: avgStepArr,
          userDrink: avgDrinkArr,
          userStatus: newUserStatus,
          dateGraphHistory: `${newDateGraphHistory.toDateString()}`
        })
      } else {
        console.log('no async storage')
        const today = new Date(Date.now())
        today.setDate(today.getDate() - 1)
        this.setState({
          dateGraphHistory: `${today.toDateString()}`
        })
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  }

  substractDate() {
    if(this.state.diffrentDate == 3) {
      console.log('hard code')
    } else {
      this.setState({ diffrentDate: this.state.diffrentDate + 1 }, () => this.getHistory())
    }
  }

  addDate() {
    if(this.state.diffrentDate == 1) {
      console.log('hard code')
    } else {
      this.setState({ diffrentDate: this.state.diffrentDate - 1 }, () => this.getHistory())
    }
  }

  componentDidMount() {
    // this.clearHistory()
    // this.setHistory()
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
              Your Average Step / Hour - { this.state.dateGraphHistory }
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
              Your Average Drink(liter) / Hour - { this.state.dateGraphHistory }
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
            paddingBottom: 5,
            width: 340,
            marginBottom: 10,
            }}>
            <Text>
              Your Activity - { this.state.dateGraphHistory }
            </Text>
            <PieChart
              style={{ height: 200, marginTop: 10, marginBottom: 10 }}
              data={pieData}
            />
            <View style={{ flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <View>
                <Svg
                  width="20"
                  height="20"
                >
                  <Rect
                    width="20"
                    height="20"
                    fill="red"
                  />
                </Svg>
              </View>
              <View style={{ marginLeft: 5, marginRight: 5 }}>
                <Text>
                  Walk
                </Text>
              </View>
              <View>
                <Svg
                  width="20"
                  height="20"
                >
                  <Rect
                    width="20"
                    height="20"
                    fill="blue"
                  />
                </Svg>
              </View>
              <View style={{ marginLeft: 5, marginRight: 5 }}>
                <Text>
                  Sit
                </Text>
              </View>
                <View>
                  <Svg
                    width="20"
                    height="20"
                  >
                    <Rect
                      width="20"
                      height="20"
                      fill="green"
                    />
                  </Svg>
                </View>
                <View style={{ marginLeft: 5, marginRight: 5 }}>
                  <Text>
                    Sleep
                  </Text>
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
