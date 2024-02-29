import { Tile as TileLayer } from 'ol/layer.js'
import OSM from 'ol/source/OSM.js'

/**
 * WIP, not used yet
 */
const layers = [
  {
    name: 'osm',
    get: function () {
      return new TileLayer({
        source: new OSM()
      })
    }
  },
  {
    name: 'swisstopo',
    get: function () {
      return null
    }
  }
]

export default layers
