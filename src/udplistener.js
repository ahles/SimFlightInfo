const dgram = require('dgram');

function readMessage(msg) { /* eslint-disable-line */
  let result = {
    latitude: 0,
    longitude: 0,
    altitude: 0,
  };

  // console.log('msg', msg);

  // const data = msg.slice(0, 4).toString();
  // console.log('data', data);

  const index = msg.readInt8(5);
  // console.log('index', index);

  // const values = msg.slice(9);
  // console.log('values', values);

  const latitude = msg.slice(9, 13).readFloatLE();
  // console.log('latitude', latitude);

  const longitude = msg.slice(13, 17).readFloatLE();
  // console.log('longitude', longitude);

  const altitude = msg.slice(17, 21).readFloatLE();
  // console.log('altitude', altitude);

  /*   const value4 = msg.slice(21, 25).readFloatLE();
  console.log('value4', value4);

  const value5 = msg.slice(21, 25).readFloatLE();
  console.log('value5', value5);

  const value6 = msg.slice(25, 29).readFloatLE();
  console.log('value6', value6);

  const value7 = msg.slice(29, 33).readFloatLE();
  console.log('value7', value7);

  const value8 = msg.slice(33, 37).readFloatLE();
  console.log('value8', value8); */

  if (index === 20) {
    // console.log(latitude + ' | ' + longitude + ' | ' + altitude);
    result = {
      latitude,
      longitude,
      altitude,
    };
  }

  // console.log('result', result);
  return result;
}

module.exports = {
  initialized: false,
  position: {
    latitude: 0,
    longitude: 0,
    altitude: 0,
  },
  udpHost: '127.0.0.1',
  udpPort: 49000,
  udpClient: null,
  init(win, isDevelopment) {
    console.log('📡 UDP Lstener onlinee');
    if (!this.initilized) {
      this.udpClient = dgram.createSocket('udp4');
      this.udpClient.on('message', (msg) => {
        const position = readMessage(msg);
        this.position = position;
        win.webContents.send('position', this.position);
        if (isDevelopment) {
          console.log('🧭 Position data received: Lat ' + position.latitude + ' | Lon ' + position.longitude + ' | Alt ' + position.altitude);
        }
      });

      this.udpClient.bind(this.udpPort, this.updHost);
      this.initialized = true;
    }
  },
  close() {
    this.udpClient.close();
  },

};
