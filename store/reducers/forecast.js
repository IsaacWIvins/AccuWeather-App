import {
  FETCH_FORECAST_BEGIN,
  FETCH_FORECAST_SUCCESS,
  FETCH_FORECAST_FAILURE
} from '../actions/forecast.js'

// create inital state of forecasts
const initialState = {
  forecast: [],
  loading: false,
  error: null
};

export default function forecastReducer(state = initialState, action) {
  switch(action.type) {
    // called first and sets loading === true
    case FETCH_FORECAST_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    // called when request is successful, returns new forecasts
    case FETCH_FORECAST_SUCCESS:
      return {
        ...state,
        loading: false,
        forecast: action.payload,
        error: null,
      };
    // called if request fails, returns error
    case FETCH_FORECAST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
