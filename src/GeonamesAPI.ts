import { CountryInterface, GeonamesWikipedia } from './Interfaces'

/**
 * GeoNames Webservice Exceptions:
 * http://www.geonames.org/export/webservice-exception.html
 */
export default class GeonamesAPI {
  private userName: string
  private latitude: number = 0
  private longitude: number = 0
  private language: string = 'en'

  constructor(userName: string) {
    this.userName = userName
  }

  /**
   * Sets the location for the API requests.
   * @param latitude The latitude of the location.
   * @param longitude The longitude of the location.
   */
  public setLocation(latitude: number, longitude: number): void {
    this.latitude = latitude
    this.longitude = longitude
  }

  /**
   * Sets the language for the API requests.
   * @param language The language code f.e. 'en', 'de', 'fr', ...
   */
  public setLanguage(language: string): void {
    this.language = language
  }

  /**
   * Fetches data from the Geonames API.
   * @param apiPath The API path to fetch data from.
   * @returns The JSON response from the API.
   */
  private async fetchData(apiPath: string, additionalParams: string = ''): Promise<any> {
    const url = `http://api.geonames.org/${apiPath}?username=${this.userName}&lat=${this.latitude}&lng=${this.longitude}${additionalParams}`
    try {
      const response = await fetch(url)
      if (response.ok) {
        const result =  await response.json()
        // console.log('result', result)
        return result
      }
      throw new Error('Network response was not ok.')
    } catch (error) {
      console.error('Error fetching data:', error)
      return null // or rethrow the error based on your error handling strategy
    }
  }

  /**
   * Retrieves the country information based on the current latitude and longitude.
   *
   * TODO: Use countryInfo instead to get localized information? http://api.geonames.org/countryInfo?username=USERNAME&lang=de&country=CH
   *
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

  /**
   * Asynchronously fetches Wikipedia links related to geographical locations nearby, utilizing the Geonames service.
   * It makes a call to the 'findNearbyWikipediaJSON' endpoint with a predefined radius of 20 (presumably kilometers or miles)
   * and limits the maximum number of results to 20. After fetching the data, it processes the results to construct an array
   * of `GeonamesWikipedia` objects, each containing information about the Wikipedia articles such as title, URL, coordinates
   * (longitude and latitude), distance from the search point, and a feature category.
   *
   * The function then sorts these results by distance in ascending order and further filters them based on specific feature
   * categories and keywords within the title. If the fetch operation is successful and relevant Wikipedia articles are found,
   * it returns an array of `GeonamesWikipedia` objects. If the operation fails or no relevant articles are found, it returns null.
   *
   * @returns {Promise<GeonamesWikipedia[] | null>} A promise that resolves to an array of `GeonamesWikipedia` objects
   * representing nearby Wikipedia articles, sorted and filtered based on distance, feature, and title keywords. If no
   * articles are found or an error occurs, it resolves to null.
   */
  async getWikipediaLinks(): Promise<GeonamesWikipedia[] | null> {
    const data = await this.fetchData('findNearbyWikipediaJSON', '&radius=20&maxRows=20&lang=' + this.language)
    if (data && Object.hasOwn(data, 'geonames')) {
      let result: GeonamesWikipedia[] = []
      for (const item of data.geonames) {
        result.push({
          title: item.title,
          wikipediaUrl: item.wikipediaUrl,
          longitude: item.lng,
          latitude: item.lat,
          distance: Number(item.distance),
          feature: item.feature
        })
      }
      this.sortByDistance(result, 'asc')
      result = this.filterByFeature(result)
      result = this.filterByTitleKeywords(result)
      return result
    }
    return null
  }

  /**
   * Sorts an array of objects by the `distance` property in either ascending or descending order
   *
   * @param {GeonamesWikipedia[]} data - The array of objects to sort.
   * @param {'asc' | 'desc'} order - Optional. The order in which to sort the array.
   * @returns {GeonamesWikipedia[]} A new array sorted by the `distance` property in the specified order.
   */
  sortByDistance(data: GeonamesWikipedia[], order: 'asc' | 'desc' = 'asc'): GeonamesWikipedia[] {
    if (!Array.isArray(data) || data.length <= 1) {
      return data // Return early for invalid or trivial input
    }

    const sortedData = [...data].sort((a, b) => {
      const distanceA = typeof a.distance === 'string' ? parseFloat(a.distance) : a.distance
      const distanceB = typeof b.distance === 'string' ? parseFloat(b.distance) : b.distance

      return order === 'asc' ? distanceA - distanceB : distanceB - distanceA
    })

    return sortedData
  }

  /**
   * Filters an array of GeonamesWikipedia objects based on a predefined list of allowed features.
   * It returns a new array containing only the elements where the `feature` property matches
   * one of the allowed features or is undefined.
   *
   * @param {GeonamesWikipedia[]} data - An array of GeonamesWikipedia objects
   *
   * @returns An array of GeonamesWikipedia objects filtered based on the allowed features.
   * Objects with an undefined `feature` property are also included in the return array.
   */
  filterByFeature(data: GeonamesWikipedia[]) {
    const wikipediaFeatureAllowedList = new Set(['city', 'waterbody', 'airport', 'landmark', 'event', 'railwaystation'])

    return data.filter((item) => typeof item.feature === 'undefined' || wikipediaFeatureAllowedList.has(item.feature))
  }

  /**
   * Filters an array of objects based on the presence of specific keywords in the `title` property of each object.
   *
   * @param {GeonamesWikipedia[]} data - The array of objects to be filtered. Each object must have a
   * `title` property that is either a string or undefined.
   * @returns {GeonamesWikipedia[]} An array containing only the objects whose `title` property does not
   * contain any of the specified keywords. If the `title` property is undefined, the object is included in the return value.
   */
  filterByTitleKeywords(data: GeonamesWikipedia[]) {
    const wikipediaTitleBlockStringList = ['hotel', 'luxury resort', 'zentrum']

    // Convert blocklist to lowercase for case-insensitive comparison
    const lowerCaseBlockList = wikipediaTitleBlockStringList.map((keyword) => keyword.toLowerCase())

    // Filter data to exclude items with titles containing any blocklist keyword
    const result = data.filter((item) => {
      if (typeof item.title === 'undefined') return true // Keep items without a title
      // Check if item's title contains any of the blocklist keywords
      const titleLowerCase = item.title.toLowerCase()
      return !lowerCaseBlockList.some((keyword) => titleLowerCase.includes(keyword))
    })

    return result
  }
}
