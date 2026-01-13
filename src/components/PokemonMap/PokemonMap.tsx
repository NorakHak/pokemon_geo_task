import React from 'react'
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import Graphic from '@arcgis/core/Graphic'
import Point from '@arcgis/core/geometry/Point'
import { PokeStopFeature } from '@/interfaces'

import "./PokemonMap.css"

interface PokemonMapProps {
    selectedPokemonType: string,
    pokestops: PokeStopFeature[],
    zoomToCoordintas?: [number, number]
}

export default function PokemonMap(props: PokemonMapProps) {
    const mapRef = React.useRef<HTMLDivElement>(null)
    const viewRef = React.useRef<MapView | null>(null)
    const layerRef = React.useRef<FeatureLayer | null>(null)

    React.useEffect(() => {
        if (!mapRef.current) return

        const map = new Map({
            basemap: "gray"
        })

        const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [44.5189, 40.1852],
            zoom: 12,
            constraints: {
                minZoom: 5
            }
        })

        viewRef.current = view

        return () => {
            view.destroy()
        }
    }, [])

    React.useEffect(() => {
        if (!viewRef.current || props.pokestops.length === 0) return

        if (layerRef.current) return

        const graphics = props.pokestops.map(stop =>
            new Graphic({
                geometry: new Point({
                    x: stop.geometry.coordinates[0],
                    y: stop.geometry.coordinates[1],
                    spatialReference: { wkid: 4326 }
                }),
                attributes: {
                    id: stop.properties.id,
                    pokemonName: stop.properties.pokemonName || "",
                    pokemonTypes: stop.properties.pokemonTypes || "",
                    pokemonSpriteUrl: stop.properties.pokemonSpriteUrl || ""
                }
            })
        )

        const featureLayer = new FeatureLayer({
            source: graphics,
            objectIdField: "id",
            geometryType: "point",
            fields: [
                { name: "id", type: "oid" },
                { name: "pokemonName", type: "string" },
                { name: "pokemonTypes", type: "string" },
                { name: "pokemonSpriteUrl", type: "string" }
            ],
            renderer: {
                type: "simple",
                symbol: {
                    type: "picture-marker",
                    url: "/pokeball.svg",
                    width: "30px",
                    height: "30px"
                }
            },
            popupTemplate: {
                title: "Pokestop #{id}",
                content: `
                <div style="text-align:center">
                    <img src="{pokemonSpriteUrl}" style="width:96px;height:96px" />
                    <h3 style="text-transform:capitalize">{pokemonName}</h3>
                    <p><b>Types:</b> {pokemonTypes}</p>
                </div>
            `
            },
            featureReduction: {
                type: "cluster",
                clusterRadius: "90px",
                popupTemplate: {
                    title: "Pokestops ({cluster_count})"
                }
            }
        })

        viewRef.current.map?.add(featureLayer)
        layerRef.current = featureLayer
    }, [props.pokestops])

    React.useEffect(() => {
        if (!layerRef.current) return

        if (props.selectedPokemonType === "all") {
            layerRef.current.definitionExpression = ""
        } else {
            layerRef.current.definitionExpression =
                `pokemonTypes LIKE '%${props.selectedPokemonType}%'`
        }
    }, [props.selectedPokemonType])

    React.useEffect(() => {
        if (!props.zoomToCoordintas || !viewRef.current) return

        viewRef.current.goTo({
            center: props.zoomToCoordintas,
            zoom: 17
        }, {
            duration: 1000
        })
    }, [props.zoomToCoordintas])


    return <div ref={mapRef} className="map-container" />
}
