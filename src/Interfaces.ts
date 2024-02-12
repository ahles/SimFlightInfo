export interface FlightInterface {
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

export interface SimStatetInterface {
  connected: boolean,
  exception: any
}
