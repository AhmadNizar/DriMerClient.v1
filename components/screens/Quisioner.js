import React from "react";
import { AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import { Slider, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux'
import { calculateWaterAction } from '../../actions/quisionerAction'
import {changeVisible} from '../../actions/userAction'

class Quisioner extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor() {
    super()

    this.state = {
      weight: '',
      sportTime: 0,
      isSmoker: false,
      isNonSmoker: true
    }
  }

  getQuisioner() {

    let activityNeed = 0
    let smokerWaterNeed = 0

    switch (activityNeed) {
      case 0:
        activityNeed = 0.03
        break;
      case 1:
        activityNeed = 0.035
        break;
      case 2:
        activityNeed = 0.04
        break;
      default:
        break;
    }

    if (this.state.isSmoker) {
      smokerWaterNeed = 0.04
    } else {
      smokerWaterNeed = 0.03
    }

    let waterNeeds = {
      sportTime: activityNeed,
      isSmoker: smokerWaterNeed,
      weight: Number(this.state.weight)
    }

    this.props.calculateWater(waterNeeds)
    this.props.changeVisible()
    AsyncStorage.setItem('drimerToken', this.props.token)
    this.props.navigation.navigate('Suggestion')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textInput}>
          <View style={styles.quisioner}>
            <Text style={{ fontWeight: 'bold' }}>How much is your weight? </Text>
            <TextInput placeholder="in kg" onChangeText={(text) => this.setState({ weight: text })} />
          </View>
          <View style={styles.quisioner}>
            <Text style={{ fontWeight: 'bold' }}>Are you a smoker ?</Text>
            <CheckBox
              title='Yes'
              checkedColor="#1ab2ff"
              checked={this.state.isSmoker}
              onPress={() => {
                if (this.state.isSmoker) {
                  this.setState({
                    isSmoker: false,
                    isNonSmoker: true
                  })
                } else {
                  this.setState({
                    isSmoker: true,
                    isNonSmoker: false
                  })
                }
              }}
            />
            <CheckBox
              title='No'
              checkedColor="#1ab2ff"
              checked={this.state.isNonSmoker}
              onPress={() => {
                if (this.state.isSmoker) {
                  this.setState({
                    isSmoker: false,
                    isNonSmoker: true
                  })
                } else {
                  this.setState({
                    isSmoker: true,
                    isNonSmoker: false
                  })
                }
              }}
            />
          </View>
          <View style={styles.quisioner}>
            <Text style={{ fontWeight: 'bold' }}>How much do you do sport?</Text>
            <View style={styles.slider}>
              <Text>Low</Text>
              <Text>Medium</Text>
              <Text>High</Text>
            </View>
            <Slider
              thumbTintColor='#1ab2ff'
              minimumValue={0}
              maximumValue={2}
              step={1}
              value={this.state.sportTime}
              onValueChange={(value) => this.setState({ sportTime: value })} />
          </View>
        </View>
        <Button title="Submit" onPress={() => this.getQuisioner()} />

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    paddingTop: 30
  },
  textInput: {
    width: 300
  },
  slider: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10
  },
  quisioner: {
    marginBottom: 20
  }

})

const mapStateToProps = (state) => {
  return {
    token: state.userReducer.token
  }
}

const mapActionToProps = (dispatch) => {
  return {
    calculateWater: (waterNeeds) => dispatch(calculateWaterAction(waterNeeds)),
    changeVisible: () => dispatch(changeVisible())
  }
}

export default connect(mapStateToProps, mapActionToProps)(Quisioner)