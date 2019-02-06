// action types
 export const FETCH_FORECAST_BEGIN = 'FETCH_FORECAST_BEGIN';
 export const FETCH_FORECAST_SUCCESS = 'FETCH_FORECAST_SUCCESS';
 export const FETCH_FORECAST_FAILURE = 'FETCH_FORECAST_FAILURE';

// action creators
export const fetchForecastBegin = () => ({
  type: FETCH_FORECAST_BEGIN
});
export const fetchForecastSuccess = data => ({
  type: FETCH_FORECAST_SUCCESS,
  payload: data
});
export const fetchForecastFailure = error => ({
  type: FETCH_FORECAST_FAILURE,
  payload: { error }
});

export function fetchForecast(location_key) {
  return dispatch => {
    // sets loading === true
    dispatch(fetchForecastBegin());
    // runs the fetch request
    return getForecast(location_key)
      .then(json => {
        // returns the successful json response
        dispatch(fetchForecastSuccess(json));
        return json;
      })
      .catch(error => {
        // returns the failed request error
        dispatch(fetchForecastFailure(error));
        return error;
      });
  };
}

function getForecast(location_key) {
  return fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${location_key}?apikey=${process.env.API_KEY}`)
    .then(handleErrors)
    .then(res => res.json());
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
