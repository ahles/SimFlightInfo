import { BrowserWindow } from 'electron'
import { open, Protocol, SimConnectDataType, SimConnectConstants, SimConnectPeriod } from 'node-simconnect'
import { FlightStateInterface } from './Interfaces'

/**
 * node-simconnect
 * https://github.com/EvenAR/node-simconnect
 */

const EVENT_ID_PAUSE = 1

const REQUEST_1 = 0
const DEFINITION_1 = 0

const simConnector = {
  init(win: BrowserWindow) {
    open('SimFlightInfo', Protocol.FSX_SP2)
      .then(function ({ recvOpen, handle }) {
        console.log('Connected to', recvOpen.applicationName)
        win.webContents.send('simconnect-simstate-connected', true)

        // https://docs.flightsimulator.com/html/Programming_Tools/SimVars/Aircraft_SimVars/Aircraft_Misc_Variables.htm#PLANE_LATITUDE
        handle.addToDataDefinition(DEFINITION_1, 'PLANE HEADING DEGREES GYRO', 'degrees', SimConnectDataType.FLOAT64)
        handle.addToDataDefinition(DEFINITION_1, 'PLANE HEADING DEGREES TRUE', 'radians', SimConnectDataType.FLOAT64)
        handle.addToDataDefinition(DEFINITION_1, 'PLANE ALTITUDE', 'feet', SimConnectDataType.FLOAT64)
        handle.addToDataDefinition(DEFINITION_1, 'PLANE ALT ABOVE GROUND', 'feet', SimConnectDataType.FLOAT64)
        handle.addToDataDefinition(DEFINITION_1, 'PLANE LATITUDE', 'degrees', SimConnectDataType.FLOAT64)
        handle.addToDataDefinition(DEFINITION_1, 'PLANE LONGITUDE', 'degrees', SimConnectDataType.FLOAT64)
        handle.addToDataDefinition(DEFINITION_1, 'PLANE BANK DEGREES', 'radians', SimConnectDataType.FLOAT64)
        handle.addToDataDefinition(DEFINITION_1, 'PLANE PITCH DEGREES', 'radians', SimConnectDataType.FLOAT64)
        handle.addToDataDefinition(DEFINITION_1, 'AIRSPEED TRUE', 'Knots', SimConnectDataType.FLOAT64)
        handle.addToDataDefinition(DEFINITION_1, 'AIRSPEED INDICATED', 'Knots', SimConnectDataType.FLOAT64)
        handle.addToDataDefinition(DEFINITION_1, 'VERTICAL SPEED', 'Feet per second', SimConnectDataType.FLOAT64)

        handle.requestDataOnSimObject(REQUEST_1, DEFINITION_1, SimConnectConstants.OBJECT_ID_USER, SimConnectPeriod.SECOND)

        handle.on('simObjectData', (recvSimObjectData) => {
          switch (recvSimObjectData.requestID) {
            case REQUEST_1: {
              const receivedData: FlightStateInterface = {
                // Read order is important!
                heading: Number(recvSimObjectData.data.readFloat64().toFixed(1)),
                headingTrue: Number(radToDeg(recvSimObjectData.data.readFloat64()).toFixed(1)),
                altitude: Number(recvSimObjectData.data.readFloat64().toFixed(0)),
                altitudeAboveGround: Number(recvSimObjectData.data.readFloat64().toFixed(0)),
                latitude: recvSimObjectData.data.readFloat64(),
                longitude: recvSimObjectData.data.readFloat64(),
                degreesBank: Number((radToDeg(recvSimObjectData.data.readFloat64()) * -1).toFixed(1)),
                degreesPitch: Number((radToDeg(recvSimObjectData.data.readFloat64()) * -1).toFixed(1)),
                airSpeedTrue: Number(recvSimObjectData.data.readFloat64().toFixed(0)),
                airSpeedIndicated: Number(recvSimObjectData.data.readFloat64().toFixed(0)),
                verticalSpeed: Number((recvSimObjectData.data.readFloat64() * 60).toFixed(0))
              }
              win.webContents.send('simconnect-flightdata', receivedData)
              break
            }
          }
        })

        handle.on('event', function (recvEvent) {
          switch (recvEvent.clientEventId) {
            case EVENT_ID_PAUSE:
              win.webContents.send('simconnect-active', recvEvent.data === 1 ? false : true)
              break
          }
        })
        handle.on('exception', (recvException) => {
          console.log(recvException)
          win.webContents.send('simconnect-simstate-exception', recvException)
        })
        handle.on('quit', function () {
          console.log('Simulator quit')
          win.webContents.send('simconnect-simstate-closed')
        })
        handle.on('close', function () {
          console.log('Connection closed unexpectedly (simulator CTD?)')
          win.webContents.send('simconnect-simstate-closed')
        })

        handle.subscribeToSystemEvent(EVENT_ID_PAUSE, 'Pause')
      })
      .catch(function (error) {
        win.webContents.send('simconnect-simstate-exception', error)
      })
  }
}

/**
 * Converts an angle from radians to degrees.
 *
 * @param radians - The angle in radians to convert.
 * @returns The angle converted to degrees.
 */
const radToDeg = (radians: number): number => {
  return radians * (180 / Math.PI)
}

export default simConnector
