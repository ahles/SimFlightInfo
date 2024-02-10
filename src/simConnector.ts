import { open, Protocol, SimConnectDataType, SimConnectConstants, SimConnectPeriod } from 'node-simconnect';

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

        handle.addToDataDefinition(DEFINITION_1, 'Kohlsman setting hg', 'inHg', SimConnectDataType.FLOAT64);
        handle.addToDataDefinition(DEFINITION_1, 'Indicated Altitude', 'feet', SimConnectDataType.FLOAT64);
        handle.addToDataDefinition(DEFINITION_1, 'Plane Latitude', 'degrees', SimConnectDataType.FLOAT64);
        handle.addToDataDefinition(DEFINITION_1, 'Plane Longitude', 'degrees', SimConnectDataType.FLOAT64);
        handle.addToDataDefinition(DEFINITION_1, 'VERTICAL SPEED', 'Feet per second', SimConnectDataType.INT32);

        handle.requestDataOnSimObject(REQUEST_1, DEFINITION_1, SimConnectConstants.OBJECT_ID_USER, SimConnectPeriod.SIM_FRAME);

        handle.on('simObjectData', recvSimObjectData => {
          switch (recvSimObjectData.requestID) {
            case REQUEST_1: {
              const receivedData = {
                // Read order is important!
                kohlsmann: recvSimObjectData.data.readFloat64(),
                altitude: recvSimObjectData.data.readFloat64(),
                latitude: recvSimObjectData.data.readFloat64(),
                longitude: recvSimObjectData.data.readFloat64(),
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

export default simConnector
