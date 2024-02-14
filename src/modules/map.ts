import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import View from 'ol/View'
import Map from 'ol/Map'
import { Tile as TileLayer/*, Vector as VectorLayer*/ } from 'ol/layer.js'
import OSM from 'ol/source/OSM.js' // import has to be like that, it won't work with import { OSM } from 'ol/source'
// import Feature from 'ol/Feature.js';
// import Point from 'ol/geom/Point.js';
// import {Icon, Style} from 'ol/style.js';
// import Vector from 'ol/source/Vector.js'; // import has to be like that, it won't work with import {Vector as VectorLayer} from 'ol/layer.js';

let map: Map

export const initMap = (longitude: number, latitude: number) => {
  return new Promise<Map>((resolve) => {
    map = new Map({
      layers: [
        getOSMLayer()
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([longitude, latitude]),
        enableRotation: false,
        zoom: 5
      })
    })
    map.on('loadend', function () {
      resolve(map)
    })
  })
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
