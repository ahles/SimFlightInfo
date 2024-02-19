export interface AppStateInterface {
  sidePanelOpen: boolean
  loading: boolean
  airplaneCentered: boolean
  geonamesUsername: string
}

export interface SimStateInterface {
  connected: boolean
  exception: any
  paused: boolean
}

export interface FlightStateInterface {
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
