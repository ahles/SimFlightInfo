import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import View from 'ol/View'
import Map from 'ol/Map'
import { Tile as TileLayer } from 'ol/layer'
import OSM from 'ol/source/OSM.js' // import has to be like that, it won't work with import { OSM } from 'ol/source'

const tileLayer = new TileLayer({
  source: new OSM()
})
tileLayer.set('name', 'map')

export const initMap = (lon: number, lat: number) => {
  return new Promise<Map>((resolve) => {
    const map = new Map({
      layers: [tileLayer],
      target: 'map',
      view: new View({
        center: fromLonLat([lon, lat]),
        enableRotation: false,
        zoom: 5
      })
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
