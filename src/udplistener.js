const dgram = require('dgram');

let messageIndex = 0;

function readMessage(msg) {
  let result = {
    latitude: 0,
    longitude: 0,
    altitudeSea: 0,
    altitudeGround: 0,
    onRunway: 0,
    mag: 0,
    magVar: 0,
  };

  const index = msg.readInt8(5);
  const mag = msg.slice(9, 13).readFloatLE();
  const magVar = msg.slice(13, 17).readFloatLE();

  const positionOffset = 36;
  const latitude = msg.slice(9 + positionOffset, 13 + positionOffset).readFloatLE();
  const longitude = msg.slice(13 + positionOffset, 17 + positionOffset).readFloatLE();
  const altitudeSea = msg.slice(17 + positionOffset, 21 + positionOffset).readFloatLE();
  const altitudeGround = msg.slice(21 + positionOffset, 25 + positionOffset).readFloatLE();
  const onRunway = msg.slice(25 + positionOffset, 29 + positionOffset).readFloatLE();

  if (index === 19) {
    result = {
      messageIndex,
      latitude,
      longitude,
      altitudeSea,
      altitudeGround,
      onRunway,
      mag,
      magVar,
    };

    messageIndex += 1;
  }

  // console.log('result', result);

  return result;
}

module.exports = {
  initialized: false,
  log: false,
  logFile: './src/assets/log.json',
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
        if (isDevelopment && this.log) {
          this.appendPositionToLog(position);
        }
      });

      this.udpClient.bind(this.udpPort, this.updHost);
      this.initialized = true;
    }
  },
  close() {
    this.udpClient.close();
  },
  appendPositionToLog(position) {
    const fs = require('fs'); /* eslint-disable-line global-require */
    const logFile = fs.readFileSync(this.logFile);
    const log = JSON.parse(logFile);
    log.push(position);
    const logJSON = JSON.stringify(log);
    fs.writeFileSync(this.logFile, logJSON);
  },
};
