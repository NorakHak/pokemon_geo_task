# Pokemon Geo Task

> An interactive map application displaying Pokemon stops using ArcGIS JavaScript SDK and React, with real-time Pokemon data from the PokeAPI.

## Overview

This project displays Pokemon stops on an interactive map, allowing users to explore Pokestops, view Pokemon information, and filter by type. Built with React and TypeScript, it leverages the ArcGIS JavaScript SDK for mapping capabilities.

## Features

### Interactive Map
- **Custom Pokeball Icons**: All Pokestops rendered with custom Pokeball SVG icons
- **Point Clustering**: Nearby stops are automatically clustered for better readability and performance
- **Smooth Navigation**: Smooth zoom transitions when navigating to specific locations

### Pokemon Data Integration
- **Real-time Fetching**: Fetches Pokemon data from the PokeAPI for each stop
- **Rich Information**: Displays Pokemon name, types, and sprite image
- **Smart Caching**: Efficient data handling with local cache to minimize API calls

### Sidebar Pokedex
- **Complete List**: View all Pokestops in a scrollable sidebar
- **Quick Navigation**: One-click zoom to any Pokestop location
- **Detailed Info**: See Pokemon name, types, and coordinates

### Type Filtering
- **Dynamic Filtering**: Filter Pokestops by Pokemon type
- **Real-time Updates**: Map and sidebar update instantly when filter changes

### Loading States
- **Smooth UX**: Loading overlay during data fetching

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18+ |
| **Language** | TypeScript 5+ |
| **Build Tool** | Vite 5+ |
| **Mapping** | ArcGIS JavaScript SDK |
| **Styling** | Plain CSS |
| **API** | [PokeAPI](https://pokeapi.co/) |

### ArcGIS SDK Features Used

- `Map` and `MapView` - Core mapping functionality
- `FeatureLayer` - Rendering Pokestop points
- `View.goTo()` - Smooth zoom animations
- `featureReduction: { type: "cluster" }` - Point clustering

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or pnpm/yarn)

### Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/NorakHak/pokemon_geo_task>
   cd pokemon_geo_task
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Key Features Explained

### Data Handling & Performance

- **Unique ID Fetching**: Only fetches unique Pokemon IDs to reduce redundant API calls
- **Local Cache**: Uses `Map<number, PokemonData>` for efficient data storage
- **State Synchronization**: React state keeps sidebar and map layer in sync

### Map Clustering

Nearby Pokestops are automatically clustered when zoomed out, improving:
- **Performance**: Fewer rendered elements
- **Readability**: Cleaner map view
- **User Experience**: Easier navigation

### Type Filtering

The filter dropdown dynamically:
- Extracts all unique Pokemon types from loaded data
- Updates both map and sidebar in real-time
- Maintains smooth performance with React `useMemo`

## Limitations

### Popup Widget

Despite significant efforts, popups for each Pokestop could not be implemented within.

- The ArcGIS `FeatureLayer` approach works well for rendering icons
- Integrating popup functionality with `GeoJSONLayer` proved challenging
- This remains a known limitation and potential future enhancement

## Future Improvements

With additional development time, the following enhancements would improve the user experience:

- **Fully Functional Popups**: Detailed Pokemon information on click
- **Nearby Filter**: Show only stops within 2km of current map center
- **Custom Basemaps**: Additional map styling options
- **Hover Effects**: Interactive hover states for map points
- **Smoother Transitions**: Enhanced animation effects
- **Mobile Optimization**: Better responsive design
- **Search Functionality**: Search Pokestops by name or Pokemon

## Development Notes

### Development Time

**Total**: ~8 hours

**Time Breakdown**:
- Understanding ArcGIS SDK: ~3 hours
- Synchronizing map/sidebar data: ~2 hours
- API integration & caching: ~1.5 hours
- UI/UX implementation: ~1.5 hours

### Framework Choice

Originally intended to use **Svelte**, but **React** was chosen for:
- Faster prototyping
- Familiarity

**Built with ❤️ using React, TypeScript, and ArcGIS JavaScript SDK**
