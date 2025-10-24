# GlobStory  -  Interactive Historical Map and Wikipedia Explorer

GlobStory is an interactive web application that combines historical maps with Wikipedia content, allowing users to explore historical information in a geographical context. The application enables users to visualize historical events, places, and timelines on a map while accessing relevant Wikipedia articles.

## Features

- Interactive historical map with time slider control
- Wikipedia article integration with smart word and year detection
- Multi-language support for various Wikipedia editions
- Automatic location detection and highlighting for place names in articles
- Year detection and time navigation from article content
- Responsive design for desktop and mobile devices
- User settings with persistent storage
- Dark/light theme options
- Customizable interface elements

## Directory Structure

```
globstory/
├── css/
│   ├── styles.css                  # Main stylesheet
│   └── leaflet-ohm-timeslider.css  # TimeSlider control styles
├── images/
│   └── GlobStory_logo150x150.png   # Application logo
├── js/
│   ├── main.js                     # Main application JavaScript
│   ├── mapstyle.js                 # Map styling definition
│   ├── decimaldate.js              # Date conversion utilities
│   └── leaflet-ohm-timeslider.js   # TimeSlider control
├── vendor/                         # Vendored third-party JS/CSS for offline use
└── index.html                      # Main HTML file
```

## Setup

This directory is pre-bundled for the Android WebView wrapper. To run it in a browser:

1. Serve the files via any static web server (for example `python3 -m http.server 8080`).
2. Open `http://localhost:8080/index.html` in a browser.
3. No server-side components are required - the application runs entirely in the browser.

## Dependencies

- Leaflet 1.9.4 — interactive maps
- Leaflet-MiniMap 3.6.1 — overview map control
- MapLibre GL JS 3.6.2 + maplibre-gl-leaflet 0.0.22 — vector tile rendering
- Font Awesome Free 6.4.0 — UI icons

Licensing details for bundled assets are listed in `../THIRD_PARTY_LICENSES.md`.

## Usage

- Search for Wikipedia articles using the search box
- Click on place names in articles to locate them on the map
- Click on years to navigate the historical timeline
- Use the language selector to change the Wikipedia language
- Customize the application behavior using the settings panel

## License

This project is open source and available under the MIT License.

## Placeholder Files

Note: The GlobStory_logo150x150.png file is a placeholder and should be replaced with an actual logo before deployment.
