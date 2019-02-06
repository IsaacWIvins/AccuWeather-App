import * as React from 'react'
import { Text, View, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { Constants } from 'expo'
import { connect } from 'react-redux'
import SearchCityInput from '../components/searchCityInput.js'
import HomeCityCell from '../components/homeCityCell.js'

class HomeScreen extends React.Component {

  // takes in array of locations, renders list of HomeCityCells
  _renderCityArray = (selectedCities) => {
    if (selectedCities.length > 0) {
      return selectedCities.map(item =>
        <HomeCityCell key={item.Key} data={item} navigationHandler={this._handleNav} />
      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Search city to add</Text>
        </View>
      )
    }
  }

  // navigation function passed to HomeCityCells, navigates to Secondary
  _handleNav = (data) => {
    this.props.navigation.navigate('Secondary', { data })
  }

  render() {
    const { locations } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: Constants.statusBarHeight }} />
        <ScrollView>
          <SearchCityInput />
          { this._renderCityArray(locations) }
        </ScrollView>
      </View>
    );
  }
}

// map the appropriate state and connect with component
const mapStateToProps = state => ({
  locations: state.locations.locations,
  loading: state.locations.loading,
  error: state.locations.error,
});
export default connect(mapStateToProps)(HomeScreen);
