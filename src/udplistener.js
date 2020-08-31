// https://github.com/ollyau/EFBConnect
// https://www.foreflight.com/support/network-gps/

const dgram = require('dgram');

let messageIndex = 0;

const xatt = {
  heading: 0,
  pitch: 0,
  roll: 0,
};

function readMessage(msg) {
  const message = msg.toString();
  const messageParts = message.split(',');

  if (messageParts[0].stratsWith('XATT')) {
    xatt.heading = parseFloat(messageParts[1]);
    xatt.pitch = parseFloat(messageParts[2]);
    xatt.roll = parseFloat(messageParts[2]);
  }

  if (messageParts[0] === 'XGPSMSFS') {
    const result = {
      messageIndex,
      latitude: parseFloat(messageParts[2]),
      longitude: parseFloat(messageParts[1]),
      altitudeSea: parseFloat(messageParts[3]), // m
      bearing: parseFloat(messageParts[4]),
      groundSpeed: parseFloat(messageParts[5]), // m/s
      heading: xatt.heading,
      pitch: xatt.pitch,
      roll: xatt.roll,
    };

    messageIndex += 1;

    // console.log('result', result);
    return result;
  }

  return null;
}

module.exports = {
  initialized: false,
  log: false,
  logFile: './src/assets/log.json',
  udpHost: '127.0.0.1',
  udpPort: 49002,
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
        if (position) {
          // console.log('position', position);
          win.webContents.send('position', position);
          if (isDevelopment && this.log) {
            this.appendPositionToLog(position);
          }
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
