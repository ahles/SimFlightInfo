import { Tile as TileLayer } from 'ol/layer.js'
import WMTSCapabilities from 'ol/format/WMTSCapabilities'
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS'
import OSM from 'ol/source/OSM.js'

/**
 * WIP, not used yet
 */
const layerManager = [
  {
    name: 'osm',
    get: async function () {
      return new TileLayer({
        source: new OSM()
      })
    }
  },
  {
    name: 'swisstopo',
    get: async function () {
      const capabilities = await fetchCapabilities()
      if (capabilities) {
        const layer = createLayer(capabilities)
        if (layer) {
          return layer
        }
      }
    }
  }
]

/**
 * Fetch the WMTSCapabilities.xml from the geo.admin.ch server
 */
async function fetchCapabilities(): Promise<string | null> {
  let result = null
  const response = await fetch('https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml')
  if (response.ok) {
    result = await response.text()
  }
  return result
}

/**
 * Create the layer
 * @param capabilities
 */
function createLayer(capabilities: string): TileLayer<WMTS> | null {
  let layer = null
  const parser = new WMTSCapabilities()
  const result = parser.read(capabilities)
  const options = optionsFromCapabilities(result, {
    layer: 'ch.swisstopo.landeskarte-farbe-10',
    matrixSet: 'EPSG:3857'
  })
  if (options) {
    layer = new TileLayer({
      opacity: 1,
      source: new WMTS(options)
    })
  }
  return layer
}

export default layerManager
