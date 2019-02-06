import React from "react"
import { createStackNavigator } from 'react-navigation'
import HomeScreen from './screens/home.js'
import Secondary from './screens/secondary.js'
import Landing from './screens/landing.js'

// HOC that attaches persisted redux store
import withStore from './store/index.js'

// Main navigaton stack
const AppNavigator = createStackNavigator({
  Landing: {
    screen: withStore(Landing),
    navigationOptions: ({ navigation }) => { return { header: null } }
  },
  Home: {
    screen: withStore(HomeScreen),
    navigationOptions: ({ navigation }) => { return { header: null } }
  },
  Secondary: {
    screen: withStore(Secondary)
  }
});

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    )
  }
}
