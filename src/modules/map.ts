import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import View from 'ol/View'
import Map from 'ol/Map'
import { Tile as TileLayer } from 'ol/layer.js'
import OSM from 'ol/source/OSM.js' // import has to be like that, it won't work with import { OSM } from 'ol/source'

let map: Map
let view: View

/**
 * Initializes and returns a new OpenLayers Map object.
 * @param longitude The longitude part of the initial center point in decimal degrees.
 * @param latitude The latitude part of the initial center point in decimal degrees.
 * @returns A Promise that resolves with the newly created Map object.
 */
export const initMap = (longitude: number, latitude: number) => {
  return new Promise<Map>((resolve) => {
    view = new View({
      center: fromLonLat([longitude, latitude]),
      enableRotation: false,
      zoom: 7
    })

    // Initialize the map with the view and OSM layer, targeting the 'map' DOM element.
    map = new Map({
      layers: [
        getOSMLayer() // EPSG:3857
      ],
      target: 'map',
      view: view
    })

    // Resolve the promise once the map has finished loading.
    map.on('loadend', function () {
      resolve(map)
    })
  })
}

/**
 * Updates the map view to a new geographic position.
 * @param longitude The longitude part of the new center point in decimal degrees.
 * @param latitude The latitude part of the new center point in decimal degrees.
 */
export const updatePosition = (longitude: number, latitude: number) => {
  view.setCenter(fromLonLat([longitude, latitude]))
}

/**
 * Creates and returns an OpenStreetMap layer.
 * @returns A TileLayer instance configured with an OSM source.
 */
const getOSMLayer = () => {
  const tileLayer = new TileLayer({
    source: new OSM()
  })
  tileLayer.set('name', 'OSM')
  return tileLayer
}
