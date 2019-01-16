const dgram = require('dgram');

function readMessage(msg) {
  let result = {
    latitude: 0,
    longitude: 0,
    altitude: 0,
  };

  const index = msg.readInt8(5);
  const latitude = msg.slice(9, 13).readFloatLE();
  const longitude = msg.slice(13, 17).readFloatLE();
  const altitudeSea = msg.slice(17, 21).readFloatLE();
  const altitudeGround = msg.slice(21, 25).readFloatLE();
  const onRunway = msg.slice(25, 29).readFloatLE();

  if (index === 20) {
    result = {
      latitude,
      longitude,
      altitudeSea,
      altitudeGround,
      onRunway,
    };
  }

  return result;
}

module.exports = {
  initialized: false,
  debug: false,
  udpHost: '127.0.0.1',
  udpPort: 49000,
  udpClient: null,
  init(win, isDevelopment) {
    if (!this.initialized) {
      this.udpClient = dgram.createSocket('udp4');

      this.udpClient.on('error', (err) => {
        console.log(`dgram error:\n${err.stack}`);
        this.udpClient.close();
      });

      this.udpClient.on('listening', () => {
        if (isDevelopment) {
          console.log('📡  UDP Listener online');
        }
      });

      this.udpClient.on('message', (msg) => {
        const position = readMessage(msg);
        win.webContents.send('position', position);
        if (isDevelopment && this.debug) {
          console.log(`🧭  Position data received: Lat ${position.latitude} | Lon ${position.longitude} | Alt ${position.altitude}`);
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
