import ArcgisMap from "@arcgis/core/Map";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";

export function initMap() {
	const el: HTMLArcgisMapElement = document.querySelector("arcgis-map")!;
	const map = new ArcgisMap({
		basemap: "gray",
	});
	el.map = map;

	return {map, view: el.view};
}

export function createPokestopsLayer() {
	return new GeoJSONLayer({
		url: "/pokestops.json",
		title: "PokeStops",
	});
}
