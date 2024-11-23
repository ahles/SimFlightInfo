/**
 * Represents the state of the application.
 */
export interface AppStateInterface {
  sidePanelOpen: boolean
  loading: boolean
  airplaneCentered: boolean
  geonamesPanelVisible: boolean
  geonamesUsername: string
  wikipediaLinksLanguage: string
  infoPanelVisible: boolean
}

/**
 * Represents the state of the simulator connection.
 */
export interface SimStateInterface {
  connected: boolean
  exception: string | null
  paused: boolean
}

/**
 * Represents flight data.
 */
export interface FlightData {
  longitude: number
  latitude: number
  altitude: number
  altitudeAboveGround: number
  heading: number
  headingTrue: number
  degreesBank: number
  degreesPitch: number
  airSpeedTrue: number
  airSpeedIndicated: number
  verticalSpeed: number
}

/**
 * Represents a country.
 */
export interface CountryInterface {
  code: string
  name: string
}

/**
 * Represents a Wikipedia entry from Geonames.
 */
export interface GeonamesWikipedia {
  title: string
  wikipediaUrl: string
  longitude: number
  latitude: number
  distance: number
  feature?: string
}
