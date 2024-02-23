export interface AppStateInterface {
  sidePanelOpen: boolean
  loading: boolean
  airplaneCentered: boolean
  geonamesPanelVisible: boolean
  geonamesUsername: string
  wikipediaLinksLanguage: string
}

export interface SimStateInterface {
  connected: boolean
  exception: any
  paused: boolean
  wikipediaMarker: GeonamesWikipedia | null
}

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

export interface CountryInterface {
  code: string
  name: string
}

export interface GeonamesWikipedia {
  title: string
  wikipediaUrl: string
  longitude: number
  latitude: number
  distance: number
  feature?: string
}
