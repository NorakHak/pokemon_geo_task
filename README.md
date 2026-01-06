# Pokemon Geo Task

## Time Limit

**4 hours maximum**. We value your time. If you're stuck for an hour on one part, move on and note it in attached letter.

## Context

You're building app for Pokemon discovery in Yerevan. The data is in `public/pokestops.json`, each point has a `pokemonId` linking to the Pokemon API.

The app is scaffolded with `vite` and `typescript` and uses `ArcGIS APIs` for mapping. These core technologies must remain in place, everything else can be modified as you see fit.

## How to Start

You need an LTS version of Node.js (^24) and a package manager.

Run these commands with your preferred package manager:

```bash
# for npm
npm install
npm run dev

# for pnpm
pnpm install
pnpm dev
```

## What to Implement

### Core Requirements

1. **Display the map** with all pokestops rendered as points (use `public/pokeball.svg` for an icon);
1. **Fetch Pokemon data** for each stop ([PokeAPI](https://pokeapi.co/): `GET /api/v2/pokemon/{id}`);
1. **Show a popup** when clicking a point: show Pokemon name, types, and sprite image;
1. **Render a sidebar list** of all stops with Pokemon names and coordinates;
1. **Create a button** to each sidebar card that zooms to its point on the map.

### Bonus (if time permits)

- **Nearby filter**: Add a toggle/button to show only stops within 2km of map center
- **Type Filter**: Filter list by Pokemon type
- **UX polish**: Loading states, error handling, etc.

## Technical Guidelines

- Use TypeScript;
- Keep code clear and maintainable;
- You may use any frontend framework of your choice (React, Vue, Svelte) or stick with vanilla;
- Use any styling solution, plain CSS is fine as well;
- For ArcGIS JS SDK, consult with the [docs](https://developers.arcgis.com/javascript/latest/api-reference/). We've kept the API surface small. Useful doc references:
  - [GeoJSONLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html)
  - [Styles](https://developers.arcgis.com/javascript/latest/visualization/)
  - [Popup Widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Popup.html)
  - [View GoTo](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View2D.html#goTo)

## What to Submit

Send us an email with a link to your public Github repository, alongside with a short note on:

- What you completed
- Rough time spent
- Write on:
	- Decisions you made;
	- Framework choice and tradeoffs;
	- How you handled loading/error states;
	- One UX improvement they’d make with more time.

## Evaluation Criteria

Some criteria upon which your work will be evaluated:

- **Functionality**: Does it work? Are edge cases handled?
- **Code Quality**: Type safety, clarity, structure;
- **Product Thinking**: UX decisions, error handling, performance awareness;
- **Communication**: commit messages, attached note.

---

**Good Luck!**
