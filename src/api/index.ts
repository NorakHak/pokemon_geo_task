import { PokeStopsGeoJSON, PokemonData, PokeStopFeature } from "../interfaces/index";

const pokemonCache = new Map<number, PokemonData | null>()

export async function fetchPokemon(pokemonId: number): Promise<PokemonData | null> {
    if (pokemonId < 1 || pokemonId > 1025) return null
    if (pokemonCache.has(pokemonId)) return pokemonCache.get(pokemonId)!

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        if (!res.ok) {
            pokemonCache.set(pokemonId, null)
            return null
        }
        const data = await res.json()
        const pokemon: PokemonData = {
            id: data.id,
            name: data.name,
            types: data.types.map((t: any) => t.type.name).join(", "),
            spriteUrl: data.sprites.front_default,
        };
        pokemonCache.set(pokemonId, pokemon)
        return pokemon
    } catch {
        pokemonCache.set(pokemonId, null)
        return null
    }
}

export async function getMergedPokemonData(geoJson: PokeStopsGeoJSON): Promise<PokeStopFeature[]> {

    const uniqueIds = Array.from(new Set(geoJson.features.map(f => f.properties.pokemonId)))

    for (const id of uniqueIds) {
        if (!pokemonCache.has(id)) {
            await fetchPokemon(id);
        }
    }

    return geoJson.features.map(feature => {
        const pokemon = pokemonCache.get(feature.properties.pokemonId)

        if (pokemon) return {
            ...feature,
            properties: {
                ...feature.properties,
                pokemonName: pokemon.name,
                pokemonTypes: pokemon.types,
                pokemonSpriteUrl: pokemon.spriteUrl,
            },
        }
    }).filter((f): f is PokeStopFeature => !!f)
}
