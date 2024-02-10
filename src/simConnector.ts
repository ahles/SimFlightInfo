import { open, Protocol, SimConnectDataType, SimConnectConstants, SimConnectPeriod } from 'node-simconnect';
import { SimInterface } from './Interfaces'

/**
 * node-simconnect
 * https://github.com/EvenAR/node-simconnect
 */

const EVENT_ID_PAUSE = 1;

const REQUEST_1 = 0;
const DEFINITION_1 = 0;

const simConnector = {
  init(win) {
    open('simflightinfo', Protocol.FSX_SP2)
      .then(function ({ recvOpen, handle }) {
        // console.log('Connected to', recvOpen.applicationName);

        // https://docs.flightsimulator.com/html/Programming_Tools/SimVars/Aircraft_SimVars/Aircraft_Misc_Variables.htm#PLANE_LATITUDE
        handle.addToDataDefinition(DEFINITION_1, 'PLANE HEADING DEGREES GYRO', 'degrees', SimConnectDataType.FLOAT64);
        handle.addToDataDefinition(DEFINITION_1, 'PLANE ALTITUDE', 'feet', SimConnectDataType.FLOAT64);
        handle.addToDataDefinition(DEFINITION_1, 'PLANE ALT ABOVE GROUND', 'feet', SimConnectDataType.FLOAT64);
        handle.addToDataDefinition(DEFINITION_1, 'PLANE LATITUDE', 'degrees', SimConnectDataType.FLOAT64);
        handle.addToDataDefinition(DEFINITION_1, 'PLANE LONGITUDE', 'degrees', SimConnectDataType.FLOAT64);
        handle.addToDataDefinition(DEFINITION_1, 'PLANE BANK DEGREES', 'degrees', SimConnectDataType.FLOAT64);
        handle.addToDataDefinition(DEFINITION_1, 'PLANE PITCH DEGREES', 'radians', SimConnectDataType.FLOAT64);
        handle.addToDataDefinition(DEFINITION_1, 'AIRSPEED TRUE', 'Knots', SimConnectDataType.FLOAT64);
        handle.addToDataDefinition(DEFINITION_1, 'AIRSPEED INDICATED', 'Knots', SimConnectDataType.FLOAT64);
        handle.addToDataDefinition(DEFINITION_1, 'VERTICAL SPEED', 'Feet per second', SimConnectDataType.INT32);

        handle.requestDataOnSimObject(REQUEST_1, DEFINITION_1, SimConnectConstants.OBJECT_ID_USER, SimConnectPeriod.SECOND);

        handle.on('simObjectData', recvSimObjectData => {
          switch (recvSimObjectData.requestID) {
            case REQUEST_1: {
              const receivedData: SimInterface = {
                // Read order is important!
                heading: recvSimObjectData.data.readFloat64(),
                altitude: recvSimObjectData.data.readFloat64(),
                altitudeAboveGround: recvSimObjectData.data.readFloat64(),
                latitude: recvSimObjectData.data.readFloat64(),
                longitude: recvSimObjectData.data.readFloat64(),
                degreesBank: radToDeg(recvSimObjectData.data.readFloat64()),
                degreesPitch: radToDeg(recvSimObjectData.data.readFloat64()),
                airSpeedTrue: recvSimObjectData.data.readFloat64(),
                airSpeedIndicated: recvSimObjectData.data.readFloat64(),
                verticalSpeed: recvSimObjectData.data.readInt32(),
              }
              // console.log('receivedData', receivedData);
              win.webContents.send('simconnect-data', receivedData)
              break;
            }
          }
        });

        handle.on('event', function (recvEvent) {
          // console.log('recvEvent', recvEvent);
          switch (recvEvent.clientEventId) {
            case EVENT_ID_PAUSE:
              // console.log(recvEvent.data === 1 ? 'Sim paused' : 'Sim unpaused');
              win.webContents.send('simconnect-message', recvEvent.data === 1 ? 'Sim paused' : 'Sim unpaused');
              break;
          }
        });
        handle.on('exception', function (recvException) {
          console.log(recvException);
        });
        handle.on('quit', function () {
          console.log('Simulator quit');
        });
        handle.on('close', function () {
          console.log('Connection closed unexpectedly (simulator CTD?)');
        });

        handle.subscribeToSystemEvent(EVENT_ID_PAUSE, 'Pause');
      })
      .catch(function (error) {
        console.log('Connection failed:', error);
      });
  },
}

/**
 * Converts an angle from radians to degrees.
 *
 * @param radians - The angle in radians to convert.
 * @returns The angle converted to degrees.
 */
const radToDeg = (radians: number): number => {
  return radians * (180/Math.PI);
}

export default simConnector
