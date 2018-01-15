import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, AsyncStorage, Modal } from "react-native";
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AwesomeAlert from 'react-native-awesome-alerts';
import { getSuggestion } from "../../actions/quisionerAction";
import icon from 'react-native-vector-icons/Ionicons';

class Suggestion extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Suggestion',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name='data-usage'
        color='#06a887' />
    ),
  }

  constructor() {
    super()
    this.state = {
      persen: 100,
      air: 0,
      konstanta: 0,
      showAlert: false,
      modalVisible: true,
      goalStatus: false
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('drimerToken').then((value) => {
      this.props.getSuggestion(value)
    })
      .catch((err) => {
        console.log(err)
      })
  }

  componentWillReceiveProps(nextProps) {
    AsyncStorage.getItem('air').then((value) => {
      if (value) {
        this.setState({
          air: value,
          konstanta: nextProps.waterNeed.toFixed(2)
        })
      } else {
        this.setState({
          air: nextProps.waterNeed.toFixed(2),
          konstanta: nextProps.waterNeed.toFixed(2)
        })
      }
    })

    AsyncStorage.getItem('persen').then((value) => {
      if (value) {
        this.setState({
          persen: Number(value),
        })
      }
    })

    if(nextProps.waterNeed) {
      this.setState({
        modalVisible: false
      })
    }
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  minum(jumlahminum) {
    if(this.state.air <= 0) {
      var persen = this.state.persen
      var air = this.state.air

      var kurang = (jumlahminum / this.state.konstanta) * 100

      air = (air - jumlahminum).toFixed(2)
      persen = persen - kurang

      AsyncStorage.setItem('air', air).then(() => {
        console.log('yeah')
      }).catch((err) => {
        console.log(err)
      })

      AsyncStorage.setItem('persen', persen.toString()).then(() => {
        console.log('yeah')
      }).catch((err) => {
        console.log(err)
      })

      this.setState({
        air: air,
        persen: persen,
        goalStatus: true
      })         
    }

    else if (this.state.air - jumlahminum >= 0) {
      var persen = this.state.persen
      var air = this.state.air

      var kurang = (jumlahminum / this.state.konstanta) * 100

      air = (air - jumlahminum).toFixed(2)
      persen = persen - kurang

      AsyncStorage.setItem('air', air).then(() => {
        console.log('yeah')
      }).catch((err) => {
        console.log(err)
      })

      AsyncStorage.setItem('persen', persen.toString()).then(() => {
        console.log('yeah')
      }).catch((err) => {
        console.log(err)
      })

      this.setState({
        air: air,
        persen: persen
      })
    } 
    
    else if(!this.state.air - jumlahminum < 0) {
      var persen = this.state.persen
      var air = this.state.air

      var kurang = (jumlahminum / this.state.konstanta) * 100

      air = (air - jumlahminum).toFixed(2)
      persen = persen - kurang

      AsyncStorage.setItem('air', air).then(() => {
        console.log('yeah')
      }).catch((err) => {
        console.log(err)
      })

      AsyncStorage.setItem('persen', persen.toString()).then(() => {
        console.log('yeah')
      }).catch((err) => {
        console.log(err)
      })

      this.setState({
        air: air,
        persen: persen,
        showAlert: true,
        goalStatus: true
      })
    }
  }

  render() {
    return (
      <View>
        <Modal
         visible={this.state.modalVisible}
         animationType={'fade'}
         onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.modalText}>Please wait</Text>
              <ActivityIndicator size="large" color="#06a887" />
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <Text style={styles.textRec}>Today's Drink Target</Text>
          <AnimatedCircularProgress
            style={{
              marginTop: 20
            }}
            size={180}
            width={8}
            fill={this.state.persen}
            tintColor="#00e0ff"
            backgroundColor="white">
            {
              (fill) => (
                <View>
                  <Text style={styles.points}>
                    { this.state.air < 0? "+" + this.state.air * -1: this.state.air }
                  </Text>
                  <Text style={styles.points}>
                    Liter
                  </Text>
                </View>
              )
            }
          </AnimatedCircularProgress>
          <Text style={styles.textRec}>Tap your drink</Text>
          <TouchableOpacity style={styles.ButtonStyle} onPress={() => { this.minum(0.6) }}>
            <Icon
            name='md-battery-full'
            type='ionicon'
            color='white'
            />
            <Text style={{color: 'white'}}>600 ml</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ButtonStyle} onPress={() => { this.minum(0.24) }}>
            <Icon
            name='cup'
            type='material-community'
            color='white'
            />
            <Text style={{color: 'white'}}>240 ml</Text>
          </TouchableOpacity>
        </View>

        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Congratulation"
          message="You have completed your liquid needs"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#296666',
    height: 550
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  points: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    alignItems: 'center',
  },
  modalText: {
    color: '#06a887',
    marginBottom: 30
  },

  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06a887',
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 20
  },

  textRec: {
    fontSize: 18,
    color: "white",
    marginTop: 20
  }
});

const mapStateToProps = (state) => {
  // console.log('ini map', state)
  return {
    waterNeed: state.quisionerReducer.waterNeeds
  }
}

const mapActionToProps = (dispatch) => {
  return {
    getSuggestion: (token) => dispatch(getSuggestion(token))
  }
}

export default connect(mapStateToProps, mapActionToProps)(Suggestion)
