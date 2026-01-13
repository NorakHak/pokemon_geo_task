import { PokeStopFeature } from '@/interfaces'

import "./Pokedex.css"

interface PokedexProps {
    isSidebarOpened: boolean,
    pokestops: PokeStopFeature[],
    onSideBarCloseClick: () => void,
    onZoomToButtonClick: (coords: [number, number]) => void
}

export default function Pokedex(props: PokedexProps) {

    function cardRenderer(stop: PokeStopFeature) {
        const coords = stop.geometry.coordinates
        const {
            pokemonName,
            pokemonTypes,
            pokemonSpriteUrl
        } = stop.properties

        return <div key={stop.properties.id} className="pokestop-card">
            <div className="card-content">
                <h3>Pokestop #{stop.properties.id}</h3>
                <div className="pokemon-info">
                    <img
                        src={pokemonSpriteUrl || ""}
                        alt={pokemonName}
                        className="pokemon-sprite"
                    />
                    <div>
                        <p className="pokemon-name">{pokemonName}</p>
                        <p className="pokemon-types">{pokemonTypes}</p>
                    </div>
                </div>
                <p className="coordinates">
                    📍 {coords[1].toFixed(4)}, {coords[0].toFixed(4)}
                </p>
            </div>
            <button
                className="button zoom"
                onClick={() => props.onZoomToButtonClick(coords)}>
                Zoom to <span>{pokemonName}</span>
            </button>
        </div>
    }

    return <aside className={`sidebar ${props.isSidebarOpened ? "open" : ""}`}>
        <div className="sidebar-header">
            <h2>Pokédex</h2>
            <button
                className="sidebar-button"
                onClick={props.onSideBarCloseClick}>
                ❮
            </button>
        </div>
        <div className="pokestop-list">
            {props.pokestops.map(stop => cardRenderer(stop))}
        </div>
    </aside>
}
