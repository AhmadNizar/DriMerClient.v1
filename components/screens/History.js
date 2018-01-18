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
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import dummyEvery15Min from '../../dummyEvery15Min.json'

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

  componentDidMount() {
    // this.clearHistory()
    // this.setHistory()
    console.log('didmount')
    this.getHistory()
  }

  setHistory = async () => {
    try {
      console.log('set history')
      const dummy = dummyEvery15Min
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
      this.setHistory()
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
            // console.log(dataUser)
            if (perHour == 0) {
              let newAvgStep = avgStep
              let newAvgDrink = avgDrink
              // console.log(newAvgDrink)
              avgStep = 0
              avgDrink = 0
              avgStepArr.push(newAvgStep)
              avgDrinkArr.push(newAvgDrink)
              perHour = 3
            } else {
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
        // console.log(avgStepArr)
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
    console.log('------------------------substract diffrentDate', this.state.diffrentDate)
    if(this.state.diffrentDate == 2) {
      console.log('hard code')
    } else {
      this.setState({ diffrentDate: this.state.diffrentDate + 1 }, () => this.getHistory())
    }
  }

  addDate() {
    console.log('++++++++++++++++++++++add diffrentDate', this.state.diffrentDate)
    if(this.state.diffrentDate == 0) {
      console.log('hard code')
    } else {
      this.setState({ diffrentDate: this.state.diffrentDate - 1 }, () => this.getHistory())
    }
  }

  suggestion() {
    if(this.state.userDrink.reduce(function(a, b) { return a + b; }, 0) > this.props.waterNeed){
      return 'Congratulation you have completed your liquid needs. Liquid drink / liquid needs: ' + this.state.userDrink.reduce(function(a, b) { return a + b; }, 0)  + '/' + this.props.waterNeed + 'liter'
    } else {
      return 'You need more drink because your body needs it.  Liquid drink / liquid needs: ' + this.state.userDrink.reduce(function(a, b) { return a + b; }, 0)  + '/' + this.props.waterNeed + 'liter'
    }
  }

  render() {
    const stepData = [
      {
        values: this.state.userStep,
        positive: {
          fill: '#06a887',
        },
      },
    ]
    const drinkData = [
      {
        values: this.state.userDrink,
        positive: {
          fill: '#06a887',
        },
      },
    ]
    const pieData = this.state.userStatus
      .filter(value => value > 0)
      .map((value, index) => {
        let color = '#1B4032'
        if (index == 0) {
          //walk
          color = '#63E5B6'
        } else if (index == 1) {
          //sit
          color = '#377F65'
        } else {
          //sit
          color = '#1B4032'
        }
        return {
          value,
          color: color,
          key: `pie-${index}`,
        }
      })
    return (
      <View style={{
        backgroundColor: '#296666',
      }} >
        <View style={{
          marginTop: 10,
          marginLeft: 10,
          marginLeft: 10,
          marginBottom: 10,
        }}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={{
              backgroundColor: '#e7fef9',
              paddingLeft: 5,
              paddingTop: 5,
              paddingRight: 5,
              paddingBottom: 5,
              width: 340,
              height: 50,
              marginBottom: 10,
              alignItems: 'center',
              borderStyle: 'solid',
              borderWidth: 2,
              borderColor: 'lightgray'
              }}
              >
              <View style={{ flex: 1, flexDirection: 'row'}}>
                <View style={{ width: 50 }}>
                  <Button
                    onPress={ () => this.substractDate()}
                    title="<"
                    color="#06a887"
                  />
                </View>
                <View style={{ width: 230, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20 }}>{ this.state.dateGraphHistory }</Text>
                </View>
                <View style={{ width: 50 }}>
                  <Button
                    onPress={ () => this.addDate()}
                    title=">"
                    color="#06a887"
                  />
                </View>
              </View>
            </View>
            <View style={{
              backgroundColor: '#e7fef9',
              paddingLeft: 5,
              paddingTop: 5,
              paddingRight: 5,
              width: 340,
              marginBottom: 10,
              borderStyle: 'solid',
              borderWidth: 2,
              borderColor: 'lightgray'
              }}
              >
              <View style={{ alignItems: 'center',
                borderBottomColor: '#bbb',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 10,
                paddingBottom: 5
                }}>
                <Text style={{ fontSize: 20 }}>
                  Average Step / Hour
                </Text>
                <Text>
                  { this.state.dateGraphHistory }
                </Text>
              </View>
              <View style={{ height: 200, width: 320, marginTop: 10 }}>
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
              backgroundColor: '#e7fef9',
              paddingLeft: 5,
              paddingTop: 5,
              paddingRight: 5,
              width: 340,
              marginBottom: 10,
              borderStyle: 'solid',
              borderWidth: 2,
              borderColor: 'lightgray'
              }}>
              <View style={{
                alignItems: 'center',
                borderBottomColor: '#bbb',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 10,
                paddingBottom: 5
                }}>
                <Text style={{ fontSize: 20 }}>
                  Average Drink(liter) / Hour
                </Text>
                <Text>
                  { this.state.dateGraphHistory }
                </Text>
              </View>
              <View style={{ height: 200, width: 320, marginTop: 10 }}>
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
              backgroundColor: '#e7fef9',
              paddingLeft: 5,
              paddingTop: 5,
              paddingRight: 5,
              paddingBottom: 15,
              width: 340,
              marginBottom: 15,
              borderStyle: 'solid',
              borderWidth: 2,
              borderColor: 'lightgray'
              }}>
              <View style={{ alignItems: 'center',
                borderBottomColor: '#bbb',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 10,
                paddingBottom: 5
                }}>
                <Text style={{ fontSize: 20 }}>
                  24 Hour Activity
                </Text>
                <Text>
                  { this.state.dateGraphHistory }
                </Text>
              </View>
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
                      fill="#63E5B6"
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
                      fill="#1B4032"
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
                      fill="#377F65"
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
              backgroundColor: '#e7fef9',
              paddingLeft: 5,
              paddingTop: 5,
              paddingRight: 5,
              paddingBottom: 5,
              width: 340,
              marginBottom: 10,
              borderStyle: 'solid',
              borderWidth: 2,
              borderColor: 'lightgray'
              }}>
              <View style={{ alignItems: 'center',
                borderBottomColor: '#bbb',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 10,
                paddingBottom: 5
                }}>
                <Text style={{ fontSize: 20 }} >Summary</Text>
                <Text>{ this.state.dateGraphHistory }</Text>
              </View>
              <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderBottomColor: '#bbb',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginBottom: 10,
                  paddingBottom: 5
                }}>
                <View style={{ width: 50 }} >
                  <Icon
                   name='hotel'
                   type='material-community'
                   color='#7DB2B2'
                   size={36}
                  />
                </View>
                <View style={{ width: 230, justifyContent: 'center'}}>
                  <Text style={{ fontSize: 17 }}>{ this.state.userStatus[1] * 15 } Minutes / { this.state.userStatus[1] * 15 / 60 } Hour(s) </Text>
                </View>
              </View>
              <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderBottomColor: '#bbb',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginBottom: 10,
                  paddingBottom: 5
                }}>
                <View style={{ width: 50 }} >
                  <Icon
                   name='seat-recline-extra'
                   type='material-community'
                   color='#7DB2B2'
                   size={36}
                  />
                </View>
                <View style={{ width: 230, justifyContent: 'center'}}>
                  <Text style={{ fontSize: 17 }}>{ this.state.userStatus[2] * 15 }  Minutes / { this.state.userStatus[2] * 15 / 60 } Hour(s) </Text>
                </View>
              </View>
              <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderBottomColor: '#bbb',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginBottom: 10,
                  paddingBottom: 5
                }}>
                <View style={{ width: 50 }} >
                  <Icon
                   name='run'
                   type='material-community'
                   color='#7DB2B2'
                   size={36}
                  />
                </View>
                <View style={{ width: 230, justifyContent: 'center'}}>
                  <Text style={{ fontSize: 17 }}>{ this.state.userStep.reduce(function(a, b) { return a + b; }, 0) } Steps / { this.state.userStep.reduce(function(a, b) { return a + b; }, 0) * 0.5 } meter </Text>
                </View>
              </View>
              <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderBottomColor: '#bbb',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginBottom: 10,
                  paddingBottom: 5
                }}>
                <View style={{ width: 50 }}>
                  <Icon
                   name='cup'
                   type='material-community'
                   color='#7DB2B2'
                   size={36}
                  />
                </View>
                <View style={{ width: 230, justifyContent: 'center'}}>
                  <Text style={{ fontSize: 17 }}>{ this.state.userDrink.reduce(function(a, b) { return a + b; }, 0) } liters (goals: { this.props.waterNeed } liters)</Text>
                </View>
              </View>
            </View>
            <View style={{
              backgroundColor: '#e7fef9',
              paddingLeft: 5,
              paddingTop: 5,
              paddingRight: 5,
              paddingBottom: 5,
              width: 340,
              marginBottom: 10,
              borderStyle: 'solid',
              borderWidth: 2,
              borderColor: 'lightgray'
              }}>
              <View style={{ alignItems: 'center',
                borderBottomColor: '#bbb',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 10,
                paddingBottom: 5
                }}>
                <Text style={{ fontSize: 20 }} >Suggestion</Text>
                <Text>{ this.state.dateGraphHistory }</Text>
              </View>
              <Text style={{ fontSize: 17 }}>{ this.suggestion() }</Text>
            </View>
            <View style={{
              backgroundColor: '#e7fef9',
              paddingLeft: 5,
              paddingTop: 5,
              paddingRight: 5,
              width: 340,
              marginBottom: 10,
              borderStyle: 'solid',
              borderWidth: 2,
              borderColor: 'lightgray'
              }}>
              <View style={{ marginBottom: 5 }}>
                <Button
                  onPress={ () => this.clearHistory()}
                  title="clear history"
                  color="#06a887"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

// <View style={{ marginBottom: 5 }}>
//   <Button
//     onPress={ () => this.setHistory()}
//     title="Set dummy Data"
//     color="#06a887"
//   />
// </View>

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 0,
  }
})

const mapStateToProps = (state) => {
  return {
    waterNeed: state.quisionerReducer.waterNeeds
  }
}

export default connect(mapStateToProps, null)(History)
