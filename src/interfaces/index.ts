export interface PokemonData {
    id: number;
    name: string;
    types: string;
    spriteUrl: string;
}

export interface PokeStopFeature {
    type: "Feature";
    properties: {
        id: number;
        pokemonId: number;

        pokemonName: string;
        pokemonTypes: string;
        pokemonSpriteUrl: string;
    };
    geometry: {
        type: "Point";
        coordinates: [number, number];
    };
}

export interface PokeStopsGeoJSON {
    type: "FeatureCollection";
    features: PokeStopFeature[];
}