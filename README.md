# AccuWeather-App
https://expo.io/@isaacwivins/weather-app

## What am I looking at?

AccuWeather-App is hybrid mobile application that uses the Googles Places API and AccuWeather's API to generate current weather conditions and a 5 day forecast. This repo is used as a display of sample code, and a directory of features and technologies.

## Demo Gifs
![Alt Text](https://media.giphy.com/media/Mnl4vErWWNN2yNmwq2/giphy.gif)![Alt Text](https://media.giphy.com/media/1oHqbnpoFjwCiiysdw/giphy.gif)

## How does it work?

Each time the user enters the application a check is made to see if the current location is turned on, and the location permissions are enabled. The user is then directed from the Landing screen to the Home screen and presented with the current weather conditions of the city they're in. Locations are stored in AsyncStorage so if the user doesn't delete the location, each time they open the app their current location will be added to their locations list. While on the Home screen the user has an option to add another location, or navigate to the Secondary screen where a 5 day forecast and mapView are displayed. The user has the ability to delete the location from the Secondary Screen, which would in turn delete it from their locations list and navigate them back to the Home screen.

### Technologies Used
React Native | Expo | Google Places API | AccuWeather API
