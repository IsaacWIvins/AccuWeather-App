import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const LoadingIndicator = () => {
  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator />
    </View>
  )
}

export default LoadingIndicator;
