import * as React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { Constants, Permissions, Location } from 'expo'
import { connect } from "react-redux"
import LoadingIndicator from '../utils/loadingIndicator.js'
import { fetchLocation } from '../store/actions/locations.js'

class Landing extends React.Component {

  state = {
    hasLocationPermission: null,
    locationPermissionError: null,
    locationServicesEnabled: null,
    city: null,
    region: null,
    latitude: null,
    longitude: null,
    loaded: false,
  }

  componentDidMount() {
    this._checkIfCurrentLocationOn();
    this._getPermissionAsync();
  }

  // check to make sure user has current location on
  _checkIfCurrentLocationOn = async () => {
    const { locationServicesEnabled } = await Location.getProviderStatusAsync()
    this.setState({
      locationServicesEnabled: locationServicesEnabled,
    })
  }

  // check to see if the location permission is granted
  _getPermissionAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      this._getLocationAsync();
    } else {
      this.setState({
        hasLocationPermission: false,
        locationPermissionError: 'Permission to access location was denied',
      });
    }
  }

  // gets the current location
  _getLocationAsync = async () => {
    let location = await Location.getCurrentPositionAsync({})
    this._getLocationNameFromCordinates(location)
  }

  // gets the longitude and latitude from current location, sets loaded === true
  _getLocationNameFromCordinates = async (location) => {
    const { longitude, latitude } = location.coords;
    let obj = { longitude: longitude, latitude: latitude }
    let place = await Location.reverseGeocodeAsync(obj)
    this.setState({
      city: place[0].city,
      region: place[0].region,
      latitude: latitude,
      longitude: longitude,
      loaded: true,
    })
  }

  // runs the same functinos in CDM, shown only when error occured getting current location data
  _tryAgain = () => {
    this._checkIfCurrentLocationOn();
    this._getPermissionAsync();
  }

  // checks against redux store to see if location already exists, adds it if it doesn't, navigates to Home
  _navigationToHome = () => {
    const { city, region } = this.state
    const data = { description: `${city}, ${region}`}
    var doesExist = false;
    this.props.locations.map(index => {
      if (index.City === city) {
        doesExist = true
      }
    })
    if (doesExist) {
      this.props.navigation.navigate('Home')
    } else {
      this.props.dispatch(fetchLocation(data.description));
      this.props.navigation.navigate('Home')
    }
  }

  render() {
    if (!this.state.loaded) {
      // shown while loading
      return <LoadingIndicator />
    } else if (!this.state.locationServicesEnabled) {
      // shown when location services isn't enabled, has _tryAgain option
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#b3e5fc'}}>
          <View style={{marginBottom: 20}}>
            <Text>Please turn Location Servieces on and try again</Text>
          </View>
          <Button
            onPress={this._tryAgain}
            title="Try Again"
            color="#841583"
          />
        </View>
      )
    } else {
      // shown when everything is good to go, has _navigationToHome option
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#b3e5fc'}}>
          <View style={{marginBottom: 20}}>
            <Text>Location: {this.state.city} {this.state.region}</Text>
          </View>
          <Button
            onPress={this._navigationToHome}
            title="Continue"
            color="#841583"
            disabled={!this.state.loaded}
          />
        </View>
      )
    }
  }
}

// map the appropriate state and connect with component
const mapStateToProps = state => ({
  locations: state.locations.locations,
  loading: state.locations.loading,
  error: state.locations.error,
});
export default connect(mapStateToProps)(Landing)
