import { CountryInterface, GeonamesWikipedia } from './Interfaces'

/**
 * GeoNames Webservice Exceptions:
 * http://www.geonames.org/export/webservice-exception.html
 */
export default class GeonamesAPI {
  private userName: string;
  private latitude: number = 0;
  private longitude: number = 0;

  constructor(userName: string) {
    this.userName = userName;
  }

  /**
   * Sets the location for the API requests.
   * @param latitude The latitude of the location.
   * @param longitude The longitude of the location.
   */
  public setLocation(latitude: number, longitude: number): void {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
   * Fetches data from the Geonames API.
   * @param apiPath The API path to fetch data from.
   * @returns The JSON response from the API.
   */
  private async fetchData(apiPath: string, additionalParams: string = ''): Promise<any> {
    const url = `http://api.geonames.org/${apiPath}?username=${this.userName}&lat=${this.latitude}&lng=${this.longitude}${additionalParams}`;
    console.log('url', url)
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Network response was not ok.');
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // or rethrow the error based on your error handling strategy
    }
  }

  /**
   * Retrieves the country information based on the current latitude and longitude.
   * @returns The country information or null if not found.
   */
  async getCountry(): Promise<CountryInterface | null> {
    const data = await this.fetchData('countryCodeJSON')
    if (data && Object.hasOwn(data, 'countryCode')) {
      return {
        code: data.countryCode,
        name: data.countryName
      }
    }
    return null
  }

  /**
   * Retrieves the ocean name based on the current latitude and longitude.
   * @returns The ocean name or null if not found.
   */
  async getOcean(): Promise<string | null> {
    const data = await this.fetchData('oceanJSON')
    if (data && Object.hasOwn(data, 'ocean')) {
      return data.ocean.name
    }
    return null
  }

  async getWikipediaLinks(): Promise<Array<GeonamesWikipedia> | null> {
    const data = await this.fetchData('findNearbyWikipediaJSON', '&radius=20&maxRows=20')
    if (data && Object.hasOwn(data, 'geonames')) {
      const result: Array<GeonamesWikipedia> = []
      for (const item of data.geonames) {
        result.push({
          title: item.title,
          wikipediaUrl: item.wikipediaUrl,
          longitude: item.lng,
          latitude: item.lat,
          distance: Number(item.distance)
        })
      }
      result.sort((a, b) => parseFloat(String(a.distance)) - parseFloat(String(b.distance)))
      return result
    }
    return null
  }
}
