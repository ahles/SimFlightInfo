import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import View from 'ol/View'
import Map from 'ol/Map'
import { defaults } from 'ol/interaction.js'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import Vector from 'ol/source/Vector.js'
import OSM from 'ol/source/OSM.js'
import Point from 'ol/geom/Point.js'
import Feature from 'ol/Feature.js'
import { Icon, Style } from 'ol/style.js'
import { GeonamesWikipedia } from '../Interfaces'

class MapService {
  private map?: Map
  private view?: View
  private markerLayer?: VectorLayer<Vector>

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

    this.map = new Map({
      layers: [this.getOSMLayer()],
      target: 'map',
      view: this.view,
      interactions: defaults({ dragPan: false })
    })

    this.map.on('moveend', () => {
      this.centerMapOnPosition()
    })

    return new Promise<Map>((resolve) => {
      // Assuming a better way to determine map readiness
      // Resolve the promise once the map has finished loading.
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

  addWikipediaMarker(location: GeonamesWikipedia) {
    const marker = new Feature({
      geometry: new Point(fromLonLat([location.longitude, location.latitude]))
    })

    marker.setStyle(
      new Style({
        image: new Icon({
          color: '#BADA55',
          crossOrigin: 'anonymous',
          src: 'images/wikipediaMarker.svg',
          width: 32,
          height: 32,
          anchor: [0.5, 1]
        })
      })
    )

    const vectorSource = new Vector({
      features: [marker]
    })

    this.markerLayer = new VectorLayer({
      source: vectorSource
    })

    this.map?.addLayer(this.markerLayer)
  }

  removeWikipediaMarker() {
    if (this.map && this.markerLayer) {
      this.map.removeLayer(this.markerLayer)
    }
  }
}

export default MapService
