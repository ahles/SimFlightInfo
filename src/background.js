
import { app, protocol, BrowserWindow } from 'electron';
import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';

const isDevelopment = process.env.NODE_ENV !== 'production';

const dgram = require('dgram');
const expressApp = require('express')();
const server = require('http').createServer(expressApp);
// https://github.com/socketio/socket.io/issues/2109
const io = require('socket.io')(server, {
  serveClient: false, // do not serve the client file, in that case the brfs loader is not needed
});

function readMessage(msg) {
  // console.log('msg', msg);

  // const data = msg.slice(0, 4).toString();
  // console.log('data', data);

  // const index = msg.readInt8(5);
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

  // console.log(latitude + ' | ' + longitude + ' | ' + altitude);

  const result = {
    latitude,
    longitude,
    altitude,
  };

  // console.log('result', result);

  return result;
}

function initUDPSocketServer() {
  const updHost = '127.0.0.1';
  const udpPort = 49000;

  const udpClient = dgram.createSocket('udp4');

  io.on('connection', (socket) => {
    console.log('connection established');
    udpClient.on('message', (msg) => {
      const position = readMessage(msg);
      io.emit('position', position);
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
      io.emit('user disconnected');
    });
  });

  udpClient.bind(udpPort, updHost);

  const socketPort = process.env.PORT || 3000;

  server.listen(socketPort);
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true });
function createWindow() {
  // Create the browser window.
  const windowOptions = {
    width: 800,
    height: 800,
    frame: false,
  };
  if (isDevelopment) {
    windowOptions.width = 1680;
    windowOptions.height = 1050;
  }

  win = new BrowserWindow(windowOptions);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools();
  }
  initUDPSocketServer();
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
