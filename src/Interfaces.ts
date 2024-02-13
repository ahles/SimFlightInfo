export interface AppStateInterface {
  sidePanelOpen: boolean,
  loading: boolean,
}

export interface SimStateInterface {
  connected: boolean,
  exception: any
}

export interface FlightStateInterface {
  longitude: number,
  latitude: number,
  altitude: number,
  altitudeAboveGround: number,
  heading: number,
  degreesBank: number,
  degreesPitch: number,
  airSpeedTrue: number,
  airSpeedIndicated: number,
  verticalSpeed: number,
}