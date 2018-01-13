import React from 'react'
import {
  Text,
  Button,
  View,
  StyleSheet,
  Dimensions,
  DeviceEventEmitter,
  Platform,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { SensorManager } from 'NativeModules';
import {
  setUserStatus,
  getUserStatus,
  addUserStep,
  updateStatusSensor,
  initStep,
  updateHistoryCount,
  clearHistoryCount
} from '../../actions/sensorAction'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

class Profile extends React.Component {
  static navigationOptions = {
    title: "Profile"
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
    }

    this.startSensor = this.startSensor.bind(this)
    this.checkStatus = this.checkStatus.bind(this)
    this.startRecording = this.startRecording.bind(this)
  }

  componentWillMount (){
    if(this.props.getUserStatus.statusSensor == true) {
      console.log('will mount')
      this.sensorStop ()
    }
  }

  componentDidMount () {
    if(this.props.getUserStatus.statusSensor == true) {
      console.log('sensor already started')
      this.sensorInit()
      // this.startSensor()
    } else {
      this.props.updateStatusSensor()
      this.sensorInit()
    }
  }

  componentWillUnmount () {
    console.log('unmount')
    this.sensorStop()
  }

  sensorInit () {
    console.log('start sensors')
    SensorManager.startStepCounter(100);
    SensorManager.startLightSensor(100);
    SensorManager.startAccelerometer(1000);
    SensorManager.startGyroscope(1000);
    SensorManager.startProximity(100);
    this.startSensor()
  }

  sensorStop () {
    console.log('stop sensors')
    this.stopRecording()
    SensorManager.stopStepCounter();
    SensorManager.stopLightSensor();
    SensorManager.stopAccelerometer();
    SensorManager.stopGyroscope();
    SensorManager.stopProximity();
  }

  startSensor () {
    console.log('start Sensor')
    DeviceEventEmitter.addListener('LightSensor', (data) => {
      this.setState({
        lightSensor: data.light
      })
    });
    DeviceEventEmitter.addListener('StepCounter', (data) => {
      if(this.state.status !== 'unknown') {
        console.log(data.steps)
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

  sensorToStoreHandler () {
    if(this.state.countForGetStatus == 5) {
      this.checkStatus()
    } else if (this.state.countForGetStatus == 1) {
      this.startRecording()
    }

    if(this.props.getUserStatus.updateHistoryCount == 300) {
      this.setHistory()
      this.props.clearHistoryCount()
    } else {
      this.props.updateHistoryCount()
    }
  }

  checkStatus () {
    console.log('checkStatus')
    let accelXstatus = this.state.accelX < 1.5 && this.state.accelX > -1.5
    let accelYstatus = this.state.accelY < 1.5 && this.state.accelY > -1.5
    let accelZstatus = this.state.accelZ < 1.5 && this.state.accelZ > -1.5
    let lightStatus = this.state.lightSensor < 10
    let micStatus = this.state.decible < -45
    console.log(this.state.decible)
    console.log(accelXstatus, lightStatus, micStatus)
    if(lightStatus && accelXstatus && micStatus){
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
      const myHistoryJson = JSON.parse(myHistoryRaw)
      console.log('set history', myHistoryJson)
      if(myHistoryJson !== null) {
        myHistoryJson.push({
          date: new Date(),
          step: this.props.getUserStatus.totalStep,
          status: this.props.getUserStatus.userStatus,
          drink: 0.1
        })
      } else {
        myHistoryJson = [{
          date: new Date(),
          step: this.props.getUserStatus.totalStep,
          status: this.props.getUserStatus.userStatus,
          drink: 0.1
        }]
      }
      const historyToString = JSON.stringify(myHistoryJson)
      await AsyncStorage.setItem('@History:user', historyToString);
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

  startRecording () {
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

  stopRecording () {
    if(AudioRecorder.onProgress) {
      AudioRecorder.stopRecording()
      .then(() => {
        console.log('audio stop record')
      })
      .catch(err => {
        console.log('cannot stop record', err)
      })
    }
  }

  render () {
    return (
      <View style = { styles.container }>
        <View style = { styles.tabContainer }>
          <View style = { styles.card }>
            <Text style = {{ fontSize: 45 }}>{this.props.getUserStatus.userEmoji} {this.props.getUserStatus.userStatus}</Text>
          </View>
          <View style = { styles.card }>
            <View>
              <Text style = {{ fontSize: 50 }}>👣 {this.props.getUserStatus.totalStep}</Text>
            </View>
          </View>
          <View style = { styles.card }>
            <View>
              <Text style = {{ fontSize: 50 }}>🥛</Text>
            </View>
            <View>
              <Text style = {{ fontSize: 50 }}> 0.2/2.1 ℓ</Text>
            </View>
          </View>

          <View style = {{ marginBottom: 10 }}>
            <Button
              onPress={this.setHistory}
              title="set AsyncStorage History"
              color="#841584"
            />
          </View>
          <View style = {{ marginBottom: 10 }}>
            <Button
              onPress={this.getHistory}
              title="get AsyncStorage History"
              color="#841584"
            />
          </View>
          <View style = {{ marginBottom: 10 }}>
            <Button
              onPress={this.clearHistory}
              title="clear AsyncStorage History"
              color="#841584"
            />
          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'column',
  },
  card: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'lightgray',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    height: 90,
    width: 320,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
  },
  fontSizeContainer: {
    fontSize: 20
  }
})

const mapStateToProps = (state) => {
  return {
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
    clearHistoryCount: () => dispatch(clearHistoryCount())
  }
}

export default connect(mapStateToProps, mapActionToProps)(Profile)