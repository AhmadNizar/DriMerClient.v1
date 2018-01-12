import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux'

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
    }
  }

  youTodayRoute = () => {
    return (
      <View style={ styles.tabContainer }>
        <Text style = { styles.fontSizeContainer }>Status: 🚶 walk/run</Text>
        <Text style = { styles.fontSizeContainer }>Steps Count: 42/6000*</Text>
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
    console.log(this.state)
    return (
      <View style = { styles.container }>
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
