import 'ol/ol.css'
import { fromLonLat, toLonLat } from 'ol/proj'
import View from 'ol/View'
import Map from 'ol/Map'
import { Tile as TileLayer } from 'ol/layer'
import { OSM } from 'ol/source'

// import { useFlightStateStore } from '../stores/flightState'

// const flightState = useFlightStateStore()

const view: View = new View({
  center: fromLonLat([0.0]),
  enableRotation: false
})

const source = new OSM()

const tileLayer = new TileLayer({
  source: source
})
tileLayer.set('name', 'map')

export const initMap = () => {
    console.log('initMap')
    return new Promise<Map>((resolve) => {
    const map = new Map({
      layers: [],
      target: 'map',
      view: view
    })
    map.on('loadend', function () {
      resolve(map)
    })
    // map.on('moveend', function () {
    //   const center = view.getCenter()
    //   if (center) {
    //     uwrState.center = toLonLat(center)
    //   }
    //   const zoom = view.getZoom()
    //   if (zoom) {
    //     uwrState.zoom = zoom
    //   }
    // })
  })
}
