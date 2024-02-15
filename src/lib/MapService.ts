import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import View from 'ol/View'
import Map from 'ol/Map'
import { Tile as TileLayer } from 'ol/layer.js'
import OSM from 'ol/source/OSM.js'

class MapService {
  private map?: Map;
  private view?: View;

  /**
   * Initializes and returns a new OpenLayers Map object asynchronously.
   * @param longitude The longitude part of the initial center point in decimal degrees.
   * @param latitude The latitude part of the initial center point in decimal degrees.
   * @returns A Promise that resolves with the newly created Map object.
   */
  async initMap(longitude: number, latitude: number): Promise<Map> {
    if (!document.getElementById('map')) {
      throw new Error("Map container with id 'map' does not exist.");
    }

    this.view = new View({
      center: fromLonLat([longitude, latitude]),
      enableRotation: false,
      zoom: 12
    });

    this.map = new Map({
      layers: [this.getOSMLayer()],
      target: 'map',
      view: this.view
    });

    return new Promise<Map>((resolve, reject) => {
      // Assuming a better way to determine map readiness
      // Resolve the promise once the map has finished loading.
      if (this.map) {
        this.map.on('loadend', () => {
          if (this.map) {
            resolve(this.map);
          }
        })
      }

    });
  }

  /**
   * Updates the map view to a new geographic position.
   * @param longitude The longitude part of the new center point in decimal degrees.
   * @param latitude The latitude part of the new center point in decimal degrees.
   */
  updatePosition(longitude: number, latitude: number): void {
    if (!this.view) {
      throw new Error("Map view is not initialized.");
    }
    this.view.setCenter(fromLonLat([8.44, 47.3]));
  }

  private getOSMLayer() {
    return new TileLayer({
      source: new OSM()
    });
  }
}

export default MapService;
