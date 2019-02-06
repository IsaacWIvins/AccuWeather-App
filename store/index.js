import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import LoadingIndicator from '../utils/loadingIndicator.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import locations from './reducers/locations.js'
import forecast from './reducers/forecast.js'

// combine reducers
const combinedReducers = combineReducers({
  locations,
  forecast,
});

// persist the combined reducers
const persistedReducer = persistReducer({
  key: 'root',
  storage,
}, combinedReducers);

// create store with persisted reducer, apply thunk middleware to manage redux asyncronously
let store = createStore(persistedReducer, applyMiddleware(thunk));

// persist the store
let persistor = persistStore(store);

// HOC that wraps the store and persistor
const withStore = (CMP) => {
  return class Wrapper extends React.Component {
    constructor(props) {
      super(props)
      this.store = store
      this.persistor = persistor
    }
    render() {
      return (
        <Provider store={this.store}>
          <PersistGate loading={<LoadingIndicator />} persistor={this.persistor}>
            <CMP {...this.props} />
          </PersistGate>
        </Provider>
      )
    }
  }
}

export default withStore;
