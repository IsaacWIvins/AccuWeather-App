// action types
export const FETCH_LOCATION_BEGIN   = 'FETCH_LOCATION_BEGIN';
export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS';
export const FETCH_LOCATION_FAILURE = 'FETCH_LOCATION_FAILURE';
export const DELETE_LOCATION = 'DELETE_LOCATION';

// action creators
export const fetchLocationBegin = () => ({
  type: FETCH_LOCATION_BEGIN
});
export const fetchLocationSuccess = data => ({
  type: FETCH_LOCATION_SUCCESS,
  payload: data
});
export const deleteLocationSuccess = data => ({
  type: DELETE_LOCATION,
  payload: data
});
export const fetchLocationFailure = error => ({
  type: FETCH_LOCATION_FAILURE,
  payload: { error }
});

export function fetchLocation(description) {
  return dispatch => {
    // sets loading === true
    dispatch(fetchLocationBegin());
    // runs first request to get location data
    return getLocation(description)
      .then(json => {
        // runs the second fetch request to get current conditions data
        const { Key, LocalizedName, AdministrativeArea, GeoPosition } = json[0];
        return getCurrentConditions(Key)
          .then(json2 => {
            // destructure json response
            const { WeatherText, IsDayTime, Temperature } = json2[0];
            let input = {
              Key,
              WeatherText,
              IsDayTime,
              GeoPosition,
              City: LocalizedName,
              State: AdministrativeArea.ID,
              Temperature: Temperature.Imperial.Value + " " + Temperature.Imperial.Unit,
            }
            // returns the new successful input
            dispatch(fetchLocationSuccess(input));
            return input;
          })
          .catch(error => {
            // returns the failed request error
            dispatch(fetchLocationFailure(error));
            return error;
          })
      })
      .catch(error => {
        // returns the first failed request error
        dispatch(fetchLocationFailure(error));
        return error;
      })
  };
}

export function deleteLocation(item) {
  return dispatch => {
    dispatch(deleteLocationSuccess(item));
  };
}

function getLocation(description) {
  return fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.API_KEY}&q=${description}`)
    .then(handleErrors)
    .then(res => res.json());
}

function getCurrentConditions(location_key) {
  return fetch(`http://dataservice.accuweather.com/currentconditions/v1/${location_key}?apikey=${process.env.API_KEY}`)
    .then(handleErrors)
    .then(res => res.json());
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
