import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, AsyncStorage, Modal } from "react-native";
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AwesomeAlert from 'react-native-awesome-alerts';
import { getSuggestion } from "../../actions/quisionerAction";

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
      modalVisible: true
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
      if(value) {
        this.setState({
          air: value,
          konstanta: nextProps.waterNeed
        })
      } else {
        this.setState({
          air: nextProps.waterNeed,
          konstanta: nextProps.waterNeed
        })
      }
    })

    AsyncStorage.getItem('persen').then((value) => {
      if(value) {
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
    if(this.state.air == 0) {
      console.log('yeah')
    } 
    else if(this.state.air - jumlahminum > 0) {
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
    } else {
      var air = 0
      AsyncStorage.setItem('air', '0').then(() => {
        console.log('yeah')
      }).catch((err) => {
        console.log(err)
      })

      AsyncStorage.setItem('persen', '0').then(() => {
        console.log('yeah')
      }).catch((err) => {
        console.log(err)
      })

      this.setState({
        air: air,
        persen: 0,
        showAlert: true
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
          <AnimatedCircularProgress
            style={{
              marginTop: 20
            }}
            size={200}
            width={8}
            fill={this.state.persen}
            tintColor="#00e0ff"
            backgroundColor="#3d5875">
            {
              (fill) => (
                <View>
                <Text style={styles.points}>
                  { this.state.air }
                </Text>
                <Text style={styles.points}>
                  Liter
                </Text>
                </View>
              )
            }
          </AnimatedCircularProgress>
          
          <Icon
           raised
           name='md-battery-full'
           type='ionicon'
           color='white'
           containerStyle={{
             marginTop: 30,
             backgroundColor: '#06a887',
             width: 90,
             height: 90,
             borderRadius: 45
           }}
           onPress={() => { this.minum(0.6) }}
          />

          <Icon
           raised
           name='cup'
           type='material-community'
           color='white'
           underlayColor='#296666'
           containerStyle={{
             marginTop: 30,
             backgroundColor: '#06a887',
             width: 90,
             height: 90,
             borderRadius: 45
           }}
           onPress={() => { this.minum(0.24) }}
          />
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
  }
});

const mapStateToProps = (state) => {
  console.log('ini map', state)
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