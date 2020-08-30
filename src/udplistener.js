const dgram = require('dgram');

let messageIndex = 0;

function readMessage(msg) {
  const message = msg.toString();
  const messageParts = message.split(',');

  // https://github.com/ollyau/EFBConnect
  // https://www.foreflight.com/support/network-gps/
  if (messageParts[0] === 'XGPSMSFS') {
    // console.log('messageParts', messageParts);
    const result = {
      messageIndex: messageIndex,
      latitude: parseFloat(messageParts[2]),
      longitude: parseFloat(messageParts[1]),
      altitudeSea: parseFloat(messageParts[3]), // m
      bearing: parseFloat(messageParts[4]),
      groundSpeed: parseFloat(messageParts[5]), // m/s
    };

    messageIndex += 1;

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
        if (position !== null) {
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
