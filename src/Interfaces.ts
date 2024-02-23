export interface AppStateInterface {
  sidePanelOpen: boolean
  loading: boolean
  airplaneCentered: boolean
  geonamesPanelVisible: boolean
  geonamesUsername: string
}

export interface SimStateInterface {
  connected: boolean
  exception: any
  paused: boolean
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

// TODO: Add feature for later filtering
export interface GeonamesWikipedia {
  title: string
  wikipediaUrl: string
  longitude: number
  latitude: number
  distance: number
  feature?: string
}

