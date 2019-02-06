import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import getIcon from '../utils/getIcon.js'
var moment = require('moment');

const DailyForecastCell = ({ data }) => {
  const { Date, Temperature, Day, Night } = data;
  const { Minimum, Maximum } = Temperature;
  var newDate = moment(Date).format('dddd')
  return (
    <View style={styles.forecastBlock}>
      <View style={styles.top}>
        <Text style={styles.textBig}>{newDate}</Text>
      </View>
      <View style={styles.middle}>
        <View style={styles.block}>
          <Text style={styles.textSmall}>Daytime</Text>
          <MaterialCommunityIcons name={"weather-sunny"} size={40} color="black" />
          <Text style={styles.textSmall}>{Day.IconPhrase}</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.textSmall}>Nighttime</Text>
          <MaterialCommunityIcons name={"weather-sunny"} size={40} color="black" />
          <Text style={styles.textSmall}>{Night.IconPhrase}</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.textBig}>{ Minimum.Value } - { Maximum.Value } { Maximum.Unit }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 2,
    flexDirection: 'row',
  },
  block: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forecastBlock: {
    width: 200,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 7,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBig: {
    fontSize: 22,
    paddingVertical: 7,
  },
  textSmall: {
    fontSize: 14,
  }
});

export default DailyForecastCell;
