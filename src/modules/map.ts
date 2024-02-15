import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import View from 'ol/View'
import Map from 'ol/Map'
import { Tile as TileLayer } from 'ol/layer.js'
import OSM from 'ol/source/OSM.js' // import has to be like that, it won't work with import { OSM } from 'ol/source'

let map: Map
let view: View

export const initMap = (longitude: number, latitude: number) => {
  return new Promise<Map>((resolve) => {
    view = new View({
      center: fromLonLat([longitude, latitude]),
      enableRotation: false,
      zoom: 7
    })

    map = new Map({
      layers: [
        getOSMLayer() // EPSG:3857
      ],
      target: 'map',
      view: view,
    })
    map.on('loadend', function () {
      resolve(map)
    })
  })
}

export const updatePosition = (longitude: number, latitude: number) => {
  view.setCenter(fromLonLat([longitude, latitude]))
}

const getOSMLayer = () => {
  const tileLayer = new TileLayer({
    source: new OSM()
  })
  tileLayer.set('name', 'map')
  return tileLayer
}

// const getMarkerLayer = (longitude: number, latitude: number, heading: number) => {
//   const iconFeature = new Feature({
//     geometry: new Point([longitude, latitude]),
//   });

//   const iconStyle = new Style({
//     image: new Icon({
//       anchor: [0, 0],
//       rotation: heading, // OpenLayers expects radians
//       anchorXUnits: 'fraction',
//       anchorYUnits: 'pixels',
//       src: '/images/plane.svg',
//     }),
//   });

//   iconFeature.setStyle(iconStyle);

//   const vectorSource = new Vector({
//     features: [iconFeature],
//   });

//   const vectorLayer = new VectorLayer({
//     source: vectorSource,
//     zIndex: 10,
//   });

//   return vectorLayer
// }
