import React from "react";
import { PokeStopFeature, PokeStopsGeoJSON } from "@/interfaces";
import { getMergedPokemonData } from "@/api";
import pokestopsRaw from "../../data/pokestops.json";
import PokemonMap from "../PokemonMap/PokemonMap";
import Pokedex from "../Pokedex/Pokedex";

import "./AppWrapper.css";

export default function AppWrapper() {
    const [pokestops, setPokestops] = React.useState<PokeStopFeature[]>([])
    const [loading, setLoading] = React.useState(true)
    const [sidebarOpen, setSidebarOpen] = React.useState(false)
    const [selectedType, setSelectedType] = React.useState<string>("all")
    const [zoomCoords, setZoomCoords] = React.useState<[number, number] | undefined>(undefined);

    React.useEffect(() => {
        async function loadData() {
            const geoJson = pokestopsRaw as PokeStopsGeoJSON
            const data = await getMergedPokemonData(geoJson)

            setPokestops(data)
            setLoading(false)
        }
        loadData()
    }, [])

    const filteredPokestops = React.useMemo(() => {
        if (selectedType === "all") return pokestops

        return pokestops.filter(stop =>
            stop.properties.pokemonTypes
                ?.split(",")
                .map(t => t.trim())
                .includes(selectedType)
        )
    }, [pokestops, selectedType])

    const pokemonTypes = React.useMemo(() => {
        const set = new Set<string>()

        pokestops.forEach(stop => {
            const types = stop.properties.pokemonTypes
            if (!types) return

            types
                .split(",")
                .map(t => t.trim())
                .forEach(t => set.add(t))
        })

        return Array.from(set).sort()
    }, [pokestops])

    function loadingOverlayRenderer() {
        if (!loading) return

        return <div className="loading-overlay">
            <div className="loader" />
        </div>
    }

    function headerRenderer() {
        return <header className="header">
            <h1>Geo Pokemon</h1>
            <div>
                <span>Filter by: </span>
                <select
                    className="type-filter"
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}>
                    <option value="all">All types</option>

                    {pokemonTypes.map(type => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <button
                className="button"
                onClick={() => setSidebarOpen(v => !v)}>
                {sidebarOpen ? "Close Pokédex" : "Open Pokédex"}
            </button>
        </header>
    }

    return (
        <div className="app-wrapper">
            {headerRenderer()}
            <div className="main-content">
                <Pokedex
                    isSidebarOpened={sidebarOpen}
                    pokestops={filteredPokestops}
                    onSideBarCloseClick={() => setSidebarOpen(prev => !prev)}
                    onZoomToButtonClick={(coords) => setZoomCoords(coords)} />
                <PokemonMap
                    pokestops={pokestops}
                    selectedPokemonType={selectedType}
                    zoomToCoordintas={zoomCoords} />
            </div>
            {loadingOverlayRenderer()}
        </div>
    )
}