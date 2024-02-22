import { CountryInterface } from './Interfaces'

/**
 * GeoNames Webservice Exception
 * http://www.geonames.org/export/webservice-exception.html
 */
export default class GeonamesAPI {
  userName: String

  longitude!: Number
  latitude!: Number

  constructor(userName: String) {
    this.userName = userName
  }

  /**
   * Sets the geographical coordinates of the current instance.
   *
   * @param longitude - The longitude to set for the current instance.
   * @param latitude - The latitude to set for the current instance.
   * @returns void
   */
  setCoordinate(longitude: Number, latitude: Number): void {
    this.longitude = longitude
    this.latitude = latitude
  }

  /**
   * https://www.geonames.org/export/web-services.html#countrycode
   */
  async getCountry(): Promise<CountryInterface | null> {
    let result: CountryInterface | null = null
    const response = await fetch(`http://api.geonames.org/countryCodeJSON?lat=${this.latitude}&lng=${this.longitude}&username=${this.userName}`)
    if (response.ok) {
      const data = await response.json()
      if (Object.hasOwn(data, 'countryCode')) {
        result = {
          code: data.countryCode,
          name: data.countryName
        }
      }
    }
    return result
  }

  async getOcean(): Promise<string | null> {
    let result: string | null = null
    const response = await fetch(`http://api.geonames.org/oceanJSON?lat=${this.latitude}&lng=${this.longitude}&username=${this.userName}`)
    if (response.ok) {
      const data = await response.json()
      if (Object.hasOwn(data, 'ocean')) {
        result = data.ocean.name
      }
    }
    return result
  }
}
