# Clutch 
Clutch is a mobile application built with React Native and Expo that delivers real-time soccer match updates, detailed league standings, and player statistics across top global leagues.

## Features
- Live scores organized by country and league.
- League tables with key statistics (matches played, wins, draws, losses, goals scored, goals conceded, goal difference, points).
- Top scorers and assist leaders with player images and team logos.
- Light mode and dark mode support with dynamic switching.

## Development
Clutch is built with React Native (Expo) and makes use of API-Football for all the soccer data.

## Installation
Run these commands:
git clone https://github.com/umbc-cmsc437-sp2025/semester-project-clutch-app.git
cd clutch-app
npm install
npx expo start
You must have Node.js installed, Expo CLI installed (npm install -g expo-cli) and have an emulator or Expo Go app on your physical device.

## Extra Information
Like I said earlier, this application needs an API key for it to function properly. A free account can be created at API-Football which will give you access to an API key.
So, in the project files where API requests are made, replace the placeholder with your actual key.
i.e: 
headers: {
  'x-apisports-key': 'your-api-key-here'
}

### Author
- Name: David Olatunji
- Email: jl05055@umbc.edu
- GitHub: David-Olatunji


