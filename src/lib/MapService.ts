import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import View from 'ol/View'
import Map from 'ol/Map'
import { defaults } from 'ol/interaction.js'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import WMTSCapabilities from 'ol/format/WMTSCapabilities'
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS'
import Vector from 'ol/source/Vector.js'
import OSM from 'ol/source/OSM.js'
import Point from 'ol/geom/Point.js'
import Feature from 'ol/Feature.js'
import { Icon, Style } from 'ol/style.js'
import { GeonamesWikipedia } from '../Interfaces'
import { defaults as defaultControls } from 'ol/control.js'

class MapService {
  private map?: Map
  private view?: View
  private markerLayer?: VectorLayer<Feature<Point>>

  longitude: number = 0
  latitude: number = 0

  /**
   * Initializes and returns a new OpenLayers Map object asynchronously.
   * @param longitude The longitude part of the initial center point in decimal degrees.
   * @param latitude The latitude part of the initial center point in decimal degrees.
   * @returns A Promise that resolves with the newly created Map object.
   */
  async initMap(longitude: number, latitude: number): Promise<Map> {
    if (!document.getElementById('map')) {
      throw new Error("Map container with id 'map' does not exist.")
    }

    this.longitude = longitude
    this.latitude = latitude

    this.view = new View({
      center: fromLonLat([this.longitude, this.latitude]),
      enableRotation: false,
      zoom: 12
    })

    const layers = []

    layers.push(this.getOSMLayer())

    // const swisstopo = await this.getSwisstopoLayer()
    // if (swisstopo) {
    //   layers.push(swisstopo)
    // }

    this.map = new Map({
      layers: layers,
      target: 'map',
      view: this.view,
      interactions: defaults({ dragPan: false }),
      controls: defaultControls()
    })

    this.map.on('moveend', () => {
      this.centerMapOnPosition()
    })

    return new Promise<Map>((resolve) => {
      if (this.map) {
        this.map.on('loadend', () => {
          if (this.map) {
            resolve(this.map)
          }
        })
      }
    })
  }

  /**
   * Updates the map view to a new geographic position.
   * @param longitude The longitude part of the new center point in decimal degrees.
   * @param latitude The latitude part of the new center point in decimal degrees.
   */
  updatePosition(longitude: number, latitude: number): void {
    this.longitude = longitude
    this.latitude = latitude

    if (!this.view) {
      throw new Error('Map view is not initialized.')
    }
    this.view.setCenter(fromLonLat([this.longitude, this.latitude]))
  }

  centerMapOnPosition() {
    if (!this.view) {
      throw new Error('Map view is not initialized.')
    }

    this.view.setCenter(fromLonLat([this.longitude, this.latitude]))
  }

  private getOSMLayer() {
    return new TileLayer({
      source: new OSM()
    })
  }

  private async getSwisstopoLayer() {
    const capabilities = await this.fetchCapabilities()
    if (capabilities) {
      const layer = this.createLayer(capabilities)
      if (layer) {
        return layer
      }
    }
  }

  /**
   * Fetch the WMTSCapabilities.xml from the geo.admin.ch server
   */
  private async fetchCapabilities(): Promise<string | null> {
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
  private createLayer(capabilities: string): TileLayer<WMTS> | null {
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

  addWikipediaMarker(location: GeonamesWikipedia) {
    const marker = new Feature({
      geometry: new Point(fromLonLat([location.longitude, location.latitude]))
    })

    marker.setStyle(
      new Style({
        image: new Icon({
          color: '#BADA55',
          crossOrigin: 'anonymous',
          src: 'images/wikipediaMarker.png',
          width: 32,
          height: 32,
          // anchor: [0.5, 0.5],
        })
      })
    )

    const vectorSource = new Vector({
      features: [marker]
    })

    this.markerLayer = new VectorLayer({
      source: vectorSource
    })

    if (this.map) {
      this.map.addLayer(this.markerLayer)
    }
  }

  removeWikipediaMarker() {
    if (this.map && this.markerLayer) {
      this.map.removeLayer(this.markerLayer)
    }
  }
}

export default MapService
