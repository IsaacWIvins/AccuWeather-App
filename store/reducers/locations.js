import {
  FETCH_LOCATION_BEGIN,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAILURE,
  DELETE_LOCATION
} from '../actions/locations.js'

// create inital state of locations
const initialState = {
  locations: [],
  loading: false,
  error: null
};

export default function locationReducer(state = initialState, action) {
  switch(action.type) {
    // called first and sets loading === true
    case FETCH_LOCATION_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    // called when request is successful, returns new locations
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: [...state.locations, action.payload],
      };
    // called if request fails, return error
    case FETCH_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    // called when deleting location, returns updated locations
    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(item => action.payload.Key !== item.Key),
      };
    default:
      return state;
  }
}
