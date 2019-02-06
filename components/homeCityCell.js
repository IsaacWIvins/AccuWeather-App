import * as React from 'react'
import { Text, View, StyleSheet, Image, TouchableHighlight, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import getIcon from '../utils/getIcon.js'

const HomeCityCell = ({ data, navigationHandler }) => {
  const { Key, WeatherText, IsDayTime, City, State, Temperature, GeoPosition } = data;
  let navObj = { Key, WeatherText, IsDayTime, City, State, Temperature, GeoPosition };
  var icon = getIcon(WeatherText);
  return (
    <TouchableHighlight style={styles.touchable}
      onPress={() => navigationHandler(navObj)}>
      <LinearGradient
        style={styles.container}
        colors={IsDayTime ? ['#FF8C00', '#FFA500', '#FFD700'] : ['#339CFF', '#2091FB', '#693EED']}
        start={[0.4, 0.2]}>
        <View style={styles.left}>
          <Text style={styles.textTemp}>{Temperature}</Text>
          <Text style={styles.textName}>{City}, {State}</Text>
        </View>
        <View style={styles.right}>
          <MaterialCommunityIcons name={icon} size={40} color="white" />
          <Text style={styles.textName}>{WeatherText}</Text>
        </View>
      </LinearGradient>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  touchable: {
    display: 'flex',
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  logo: {
    height: 40,
    width: 40,
  },
  left: {
    flex: 1,
    paddingHorizontal: 20,
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTemp: {
    fontSize: 28,
    paddingVertical: 7,
    color: 'white',
  },
  textName: {
    color: 'white',
  }
});

export default HomeCityCell;
