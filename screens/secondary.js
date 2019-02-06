import * as React from 'react'
import { Text, View, Button, StyleSheet, ScrollView } from 'react-native'
import { fetchForecast } from '../store/actions/forecast.js'
import { deleteLocation } from '../store/actions/locations.js'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo'
import Map from '../components/mapView.js'
import DailyForecastCell from '../components/dailyForecastCell.js'

class Secondary extends React.Component {

  state = {
    loading: true
  }

  componentDidMount() {
    const { Key } = this.props.navigation.state.params.data;
    this._getForecast(Key)
  }

  // gets the forecast from location key, sets loading === false
  _getForecast = async (key) => {
    await this.props.dispatch(fetchForecast(key));
    this.setState({
      loading: false
    })
  }

  // deletes the selected location from redux store, navigates back to Home
  _handleDelete = async () => {
    const { data } = this.props.navigation.state.params
    await this.props.dispatch(deleteLocation(data));
    this.props.navigation.goBack()
  }

  // takes in array of forecasts, renders list of DailyForecastCells
  _renderForecast = (DailyForecasts) => {
    return DailyForecasts.map(item => {
      return <DailyForecastCell data={item} key={item.Date} />
    })
  }

  render() {
    if (this.state.loading) {
      // shown while loading
      return <LoadingIndicator />
    }
    const { DailyForecasts } = this.props.forecast;
    const { Key, WeatherText, IsDayTime, City, State, Temperature, GeoPosition } = this.props.navigation.state.params.data;
    // shown when everything is good to go
    return (
      <View style={styles.container}>
        <LinearGradient
          style={styles.container}
          colors={IsDayTime ? ['#FF8C00', '#FFA500', '#FFD700'] : ['#339CFF', '#2091FB', '#693EED']}
          start={[0.4, 0.2]}>
          <View style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
              <View style={styles.headerLeft}>
                <Text style={styles.textTemp}>  {Temperature}   {City}, {State}</Text>
              </View>
              <View style={styles.headerRight}>
                <Button
                  onPress={this._handleDelete}
                  title="Delete"
                  color={ IsDayTime ? 'navy' : 'orange' } />
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
              { this._renderForecast(DailyForecasts) }
            </ScrollView>
          </View>
        </LinearGradient>
        <Map cordinates={GeoPosition} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  headerLeft: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  textTemp: {
    fontSize: 28,
    paddingVertical: 7,
    color: 'white',
  },
  scrollView: {
    alignItems: 'center',
  }
});

// map the appropriate state and connect with component
const mapStateToProps = state => ({
  forecast: state.forecast.forecast,
  loading: state.forecast.loading,
  error: state.forecast.error,
});
export default connect(mapStateToProps)(Secondary);
