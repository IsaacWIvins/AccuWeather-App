export default getIcon = (WeatherText) => {
  var icon;
  switch(WeatherText) {
    case "Sunny":
      icon = "weather-sunny";
      break;
    case "Mostly cloudy":
      icon = "weather-cloudy";
      break;
    case "Cloudy":
      icon = "weather-cloudy";
      break;
    case "Raining":
      icon = "weather-pouring";
      break;
    case "Thunder Storms":
      icon = "weather-lightning-rainy";
      break;
    default:
      icon = "weather-hurricane";
  }
  return icon;
}
