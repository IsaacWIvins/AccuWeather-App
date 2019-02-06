import * as React from 'react'
import { Text, View, StyleSheet, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { fetchLocation } from '../store/actions/locations.js'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const queryConfig = {
  key: process.env.GOOGLE_PLACES_API_KEY,
  language: 'en',
  types: '(cities)'
}

class SearchCityInput extends React.Component {
  
  state = {
    input: null
  }

  // checks against existing locations
  // adds selected location to redux store
  // resets GooglePlacesRef to ''
  _handleCLick = async (data, details) => {
    var city = data.description.split(",", 1);
    var doesExist = false;
    this.props.locations.map(index => {
      if (index.City === city[0]) {
        doesExist = true
      }
    })
    if (doesExist) {
      this.GooglePlacesRef._handleChangeText('')
    } else {
      await this.props.dispatch(fetchLocation(data.description));
      this.GooglePlacesRef._handleChangeText('')
    }
  }

  render() {
    return (
      <GooglePlacesAutocomplete
        ref={(instance) => this.GooglePlacesRef = instance }
        placeholder='Enter Location'
        minLength={2}
        autoFocus={false}
        returnKeyType={'default'}
        fetchDetails={true}
        onPress={(data, details) => this._handleCLick(data, details) }
        styles={{
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth:0,
            marginBottom: 10,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 16
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          },
        }}
        query={queryConfig}
        currentLocation={false}
      />
    );
  }
}

// map the appropriate state and connect with component
const mapStateToProps = state => ({
  locations: state.locations.locations,
  loading: state.locations.loading,
  error: state.locations.error,
});
export default connect(mapStateToProps)(SearchCityInput);
