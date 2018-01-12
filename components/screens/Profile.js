import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  DeviceEventEmitter,
  Platform
} from 'react-native'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux'
import { SensorManager } from 'NativeModules';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

class Profile extends React.Component {
  static navigationOptions = {
    title: "Profile"
  }

  constructor() {
    super()
    this.state = {
      index: 0,
      routes: [
        { key: 'youToday', title: 'You Today' },
        { key: 'history', title: 'History' },
      ],
      helloState: 'hello state',
      status: 'unknown',
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
    // this.startRecording = this.startRecording.bind(this)
  }

  componentDidMount() {
    SensorManager.startStepCounter(100);
    SensorManager.startLightSensor(100);
    SensorManager.startAccelerometer(1000);
    SensorManager.startGyroscope(1000);
    SensorManager.startProximity(100);
    this.startSensor()
  }

  startSensor () {
    console.log('start Sensor')
    DeviceEventEmitter.addListener('LightSensor', (data) => {
      this.setState({
        lightSensor: data.light
      })
    });
    DeviceEventEmitter.addListener('StepCounter', (data) => {
      this.setState({
        step: this.state.step + 1,
        status: 'walk/run',
        countForGetStatus: 0
      })
    });
    DeviceEventEmitter.addListener('Gyroscope', (data) => {
      this.setState({
        gyroX: (+data.x).toFixed(2),
        gyroY: (+data.y).toFixed(2),
        gyroZ: (+data.z).toFixed(2),
      })
    });
    DeviceEventEmitter.addListener('Accelerometer', (data) => {
      if(this.state.countForGetStatus == 5) {
        console.log(this.state.countForGetStatus)
        this.checkStatus()
        this.stopRecording()
      } else if (this.state.countForGetStatus == 1) {
        this.startRecording()
      }
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

  checkStatus() {
    console.log('checkStatus')
    let accelXstatus = this.state.accelX < 1.5 && this.state.accelX > -1.5
    let lightStatus = this.state.lightSensor < 10
    let micStatus = this.state.decible < -45
    console.log(accelXstatus, lightStatus, micStatus)
    if(lightStatus && accelXstatus && micStatus){
      this.setState({
        status: 'rest/sleep',
        countForGetStatus: 0
      })
    } else if (accelXstatus) {
      this.setState({
        status: 'rest/sit',
        countForGetStatus: 0
      })
    } else {
      this.setState({
        countForGetStatus: 0
      })
    }
  }

  startRecording() {
    // let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
    //
    // AudioRecorder.prepareRecordingAtPath(audioPath, {
    //   SampleRate: 22050,
    //   Channels: 1,
    //   AudioQuality: "Low",
    //   AudioEncoding: "aac",
    //   MeteringEnabled: true
    // });
    // AudioRecorder.startRecording()
    // .then((data) => {
    //   AudioRecorder.onProgress = data => {
    //     let decibels = Math.floor(data.currentMetering);
    //     this.setState({
    //       decible: decibels
    //     })
    //   };
    // });
  }

  stopRecording() {
    // AudioRecorder.stopRecording();
  }

  youTodayRoute = () => {
    console.log('here')
    return (
      <View style={ styles.tabContainer }>
        <Text style = { styles.fontSizeContainer }>Status: 🚶 { this.state.status }</Text>
        <Text style = { styles.fontSizeContainer }>Steps Count: { this.state.step }/6000*</Text>
        <Text style = { styles.fontSizeContainer }>Drink Count: 0.2/2.1 liters</Text>
        <Text style = { styles.fontSizeContainer }>{ this.state.helloState }</Text>
      </View>
    )
  };

  historyRoute = () => {
    return (
      <View style={ styles.tabContainer }>
        <Text style = { styles.fontSizeContainer }>Steps per day: 666</Text>
        <Text style = { styles.fontSizeContainer }>Drink per day: 2.0 liters</Text>
      </View>
    )
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    youToday: this.youTodayRoute,
    history: this.historyRoute,
  });

  render() {
    return (
      <View style = { styles.container }>
        <Text style = { styles.fontSizeContainer }>Status: 🚶 { this.state.status }</Text>
        <Text style = { styles.fontSizeContainer }>Steps Count: { this.state.step }/6000*</Text>
        
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  tabContainer: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  fontSizeContainer: {
    fontSize: 20
  }
})

const mapStateToProps = (state) => {
  return {

  }
}

const mapActionToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapActionToProps)(Profile)
