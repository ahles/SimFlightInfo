import { CountryInterface } from './Interfaces'

export default class GeonamesAPI {
  userName: String

  longitude!: Number;
  latitude!: Number;

  constructor(userName: String) {
    this.userName = userName
  }

  setCoordinate(longitude: Number, latitude: Number): void {
    this.longitude = longitude
    this.latitude = latitude
  }

  async getCountry(): Promise<CountryInterface|null> {
    let result: CountryInterface|null = null
    const url = `http://api.geonames.org/countryCodeJSON?lat=${this.latitude}&lng=${this.longitude}&username=${this.userName}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json()
      result = {
        code: data.countryCode,
        name: data.countryName
      }
    }
    return result
  }
}