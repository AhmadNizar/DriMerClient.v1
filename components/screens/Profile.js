import React from 'react'
import {
  Text,
  Button,
  View,
  StyleSheet,
  Dimensions,
  DeviceEventEmitter,
  Platform,
  AsyncStorage,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { SensorManager } from 'NativeModules';
import { Icon, SocialIcon, Card } from 'react-native-elements'
import { changeLogout, changeVisible } from '../../actions/userAction'
import { clearSuggestion } from "../../actions/quisionerAction";
import {
  setUserStatus,
  getUserStatus,
  addUserStep,
  updateStatusSensor,
  initStep,
  updateHistoryCount,
  clearHistoryCount
} from '../../actions/sensorAction'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

class Profile extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Activity',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name='run'
        type="material-community"
        color='#06a887' />
    ),
  }

  constructor(props) {
    super(props)
    this.state = {
      status: 'unknown',
      emoji: '',
      lastStep: 0,
      step: 0,
      gyroX: 0.00,
      gyroY: 0.00,
      gyroZ: 0.00,
      accelX: 0.00,
      accelY: 0.00,
      accelZ: 0.00,
      lightSensor: 0,
      decible: 0,
      proximityNear: '',
      proximityValue: 0,
      proximityMaxRange: 0,
      countForGetStatus: 0,
      waterDrinked: 0
    }

    this.startSensor = this.startSensor.bind(this)
    this.checkStatus = this.checkStatus.bind(this)
    this.startRecording = this.startRecording.bind(this)
    this.getWaterDrinked = this.getWaterDrinked.bind(this)
  }

  componentWillMount() {
    if (this.props.getUserStatus.statusSensor == true) {
      console.log('will mount')
      this.sensorStop()
    }
  }

  componentDidMount() {
    if (this.props.getUserStatus.statusSensor == true) {
      console.log('sensor already started')
      this.sensorInit()
      // this.startSensor()
    } else {
      this.props.updateStatusSensor()
      this.sensorInit()
    }
  }

  componentWillUnmount() {
    this.sensorStop()
    this.props.clearSuggestion()
  }
  logout = () => {

    AsyncStorage.removeItem('drimerToken').then(() => {
      this.props.changeLogout()
    })
      .catch((err) => {
        console.log(err)
      })

    AsyncStorage.removeItem('air').then(() => {
      console.log('hapus air')
    })
      .catch((err) => {
        console.log(err)
      })

    AsyncStorage.removeItem('persen').then(() => {
      console.log('hapus air')
    })
      .catch((err) => {
        console.log(err)
      })
  }

  // componentWillUnmount() {
  //   this.props.clearSuggestion()
  // }

  getWaterDrinked = async () => {
    try {
      let waterDrinked = await AsyncStorage.getItem('air')
      if (waterDrinked) {
        this.setState({
          waterDrinked: waterDrinked
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  sensorInit() {
    console.log('start sensors')
    SensorManager.startStepCounter(100);
    SensorManager.startLightSensor(100);
    SensorManager.startAccelerometer(1000);
    SensorManager.startGyroscope(1000);
    SensorManager.startProximity(100);
    this.startSensor()
  }

  sensorStop() {
    console.log('stop sensors')
    this.stopRecording()
    SensorManager.stopStepCounter();
    SensorManager.stopLightSensor();
    SensorManager.stopAccelerometer();
    SensorManager.stopGyroscope();
    SensorManager.stopProximity();
  }

  startSensor() {
    console.log('start Sensor')
    DeviceEventEmitter.addListener('LightSensor', (data) => {
      this.setState({
        lightSensor: data.light
      })
    });
    DeviceEventEmitter.addListener('StepCounter', (data) => {
      if (this.state.status !== 'unknown') {
        this.setState({
          step: this.state.step + 1,
          status: 'walk/run',
          emoji: '🚶',
          countForGetStatus: 0
        })
        this.props.setUserStatus(this.state.status, 1, this.state.emoji)
        this.props.addUserStep(data.steps)
      } else if (this.props.getUserStatus.savedStep == 0) {
        this.props.initStep(data.steps)
      }
    });
    DeviceEventEmitter.addListener('Gyroscope', (data) => {
      this.setState({
        gyroX: (+data.x).toFixed(2),
        gyroY: (+data.y).toFixed(2),
        gyroZ: (+data.z).toFixed(2),
      })
    });
    DeviceEventEmitter.addListener('Accelerometer', (data) => {
      this.sensorToStoreHandler()
      this.setState({
        accelX: (+data.x).toFixed(2),
        accelY: (+data.y).toFixed(2),
        accelZ: (+data.z).toFixed(2),
        countForGetStatus: this.state.countForGetStatus + 1
      })
    });
    DeviceEventEmitter.addListener('Proximity', (data) => {
      this.setState({
        proximityNear: data.isNear,
        proximityValue: data.value,
        proximityMaxRange: data.maxRange
      })
    });
  }

  sensorToStoreHandler() {
    if (this.state.countForGetStatus == 5) {
      this.checkStatus()
    } else if (this.state.countForGetStatus == 1) {
      this.startRecording()
    }
    //every 5 detik set history
    // if (this.props.getUserStatus.updateHistoryCount == 5) {
    //   this.setHistory()
    //   this.props.clearHistoryCount()
    // } else {
    //   this.props.updateHistoryCount()
    // }
  }

  checkStatus() {
    console.log('checkStatus')
    let accelXstatus = this.state.accelX < 1.5 && this.state.accelX > -1.5
    let accelYstatus = this.state.accelY < 1.5 && this.state.accelY > -1.5
    let accelZstatus = this.state.accelZ < 1.5 && this.state.accelZ > -1.5
    let lightStatus = this.state.lightSensor < 10
    let micStatus = this.state.decible < -45
    console.log('mic decible: ', this.state.decible)
    if (lightStatus && accelXstatus && micStatus) {
      this.setState({
        status: 'rest/sleep',
        emoji: '🛌',
        countForGetStatus: 0
      })
      this.props.setUserStatus('rest/sleep', 0, '🛌')
    } else if (accelXstatus) {
      this.setState({
        status: 'rest/sit',
        emoji: '💺',
        countForGetStatus: 0
      })
      this.props.setUserStatus('rest/sit', 0, '💺')
    } else {
      this.setState({
        countForGetStatus: 0
      })
    }
  }

  setHistory = async () => {
    try {
      const myHistoryRaw = await AsyncStorage.getItem('@History:user');
      const drinkedWater = await AsyncStorage.getItem('air');
      const myHistoryJson = JSON.parse(myHistoryRaw)
      let waterDrink = 0

      if (drinkedWater !== null) {
        waterDrink = this.props.waterNeed - Number(drinkedWater)
      } else {
        waterDrink = 0
      }
      // console.log(waterDrink)
      if (myHistoryJson !== null) {
        myHistoryJson.push({
          date: new Date(),
          step: this.props.getUserStatus.totalStep,
          status: this.props.getUserStatus.userStatus,
          drink: waterDrink.toString()
        })
      } else {
        myHistoryJson = [{
          date: new Date(),
          step: this.props.getUserStatus.totalStep,
          status: this.props.getUserStatus.userStatus,
          drink: waterDrink.toString()
        }]
      }
      const historyToString = JSON.stringify(myHistoryJson)
      await AsyncStorage.setItem('@History:user', historyToString);
      await AsyncStorage.setItem('step', this.props.getUserStatus.totalStep.toString())
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  }

  getHistory = async () => {
    try {
      const value = await AsyncStorage.getItem('@History:user');
      console.log('get history', value)
    } catch (error) {
      // Error retrieving data
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

  startRecording() {
    this.stopRecording()
    let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      MeteringEnabled: true
    });
    AudioRecorder.startRecording()
      .then((data) => {
        AudioRecorder.onProgress = data => {
          let decibels = Math.floor(data.currentMetering);
          this.setState({
            decible: decibels
          })
        };
      });
  }

  stopRecording() {
    if (AudioRecorder.onProgress) {
      AudioRecorder.stopRecording()
        .then(() => {
          console.log('audio stop record')
        })
        .catch(err => {
          console.log('cannot stop record', err)
        })
    }
  }

  render() {
    var activityIcon = null
    if (this.props.getUserStatus.userStatus == 'walk/run') {
      activityIcon =
        <Icon
          name='run'
          type='material-community'
          color='#7DB2B2'
          size={100}
        />
    } else if (this.props.getUserStatus.userStatus == 'rest/sleep') {
      activityIcon =
        <Icon
          name='hotel'
          type='font-awesome'
          color='#7DB2B2'
          size={100}
          containerStyle={{ marginLeft: 5, marginRight: 5 }}
        />
    } else if (this.props.getUserStatus.userStatus == 'rest/sit') {
      activityIcon =
        <Icon
          name='seat-recline-extra'
          type='material-community'
          color='#7DB2B2'
          size={100}
        />
    }
    return (
      // <View style={styles.container}>
      //   <AnimatedCircularProgress
      //     style={{
      //       marginTop: 40
      //     }}
      //     size={220}
      //     width={5}
      //     fill={0}
      //     tintColor="#00e0ff"
      //     backgroundColor="#3d5875">
      //     {
      //       (fill) => (
      //         <View style={{alignItems: 'center'}}>
      //         <Text style={{fontSize: 46, alignItems: 'center'}}>
      //           👣 {this.props.getUserStatus.totalStep}
      //         </Text>
      //         <Text>
      //           STEPS TODAY
      //         </Text>
      //         </View>
      //       )
      //     }
      //   </AnimatedCircularProgress>
      //   <View style={styles.activityStatus}>
      //     <View style={{flexDirection: 'row', width: null, height: 60, alignItems: 'center'}}>
      //     <Text style={styles.stepText}>Activity Status :</Text>
      //     {activityIcon}
      //     <Text style={styles.stepText}>{this.props.getUserStatus.userStatus.toUpperCase()}</Text>
      //     </View>
      //   </View>
      //   <View>
      //     <SocialIcon
      //       style={{ backgroundColor: '#06a887' }}
      //       button
      //       type="sign-out"
      //       title="Logout"
      //       onPress={() => {
      //         this.logout()
      //       }}
      //     />
      //     </View>
      // </View>
      <View style={styles.container}>
        <Card title="Today's Target : 6000 Steps" titleStyle={{ color: '#7DB2B2', fontSize: 20 }}>
          <View style={styles.footStatus}>
            <View>
              <Icon
                name='foot'
                type='foundation'
                color='#7DB2B2'
                size={100}
              />

            </View>
            <View style={{ alignItems: 'center' }}>

              <Text style={styles.stepText}>{this.props.getUserStatus.totalStep}</Text>
              <Text style={styles.stepToday}>Steps Today</Text>
            </View>

          </View>
        </Card>

        <Card title="Activity Status" titleStyle={{ color: '#7DB2B2', fontSize: 20 }} >
          <View style={styles.activityStatus}>
            <View style={{ width: null, height: 60, alignItems: 'center', justifyContent: 'flex-start' }}>
              {activityIcon}
              <Text style={{ fontSize: 40, color: '#66FFFF' }}>{this.props.getUserStatus.userStatus.toUpperCase()}</Text>
            </View>
          </View>
        </Card>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#296666'
  },

  stepText: {
    fontSize: 74,
    color: '#66FFFF'
  },

  activityStatus: {
    // justifyContent: 'flex-start',
    height: 60,
    alignItems: 'center',
    marginBottom: 70,
  },

  stepToday: {
    fontSize: 20,
    color: '#7DB2B2',
  },

  footStatus: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

const mapStateToProps = (state) => {
  return {
    waterNeed: state.quisionerReducer.waterNeeds,
    getUserStatus: state.sensorReducer
  }
}

const mapActionToProps = (dispatch) => {
  return {
    setUserStatus: (userStatus, userStep, userEmoji) => dispatch(setUserStatus(userStatus, userStep, userEmoji)),
    addUserStep: (newStep) => dispatch(addUserStep(newStep)),
    updateStatusSensor: () => dispatch(updateStatusSensor()),
    initStep: (initialStep) => dispatch(initStep(initialStep)),
    updateHistoryCount: () => dispatch(updateHistoryCount()),
    clearHistoryCount: () => dispatch(clearHistoryCount()),
    changeLogout: () => dispatch(changeLogout()),
    changeVisible: () => dispatch(changeVisible()),
    clearSuggestion: () => dispatch(clearSuggestion())
  }
}

export default connect(mapStateToProps, mapActionToProps)(Profile)
