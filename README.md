# whereismyplane

Electron-App that listens to the position information  sent by X-Plane and displays the current location on a map.

Configure X-Plane to send the positional data (globalposition) over UDP 49000 to the IP of the computer in your local network where this app is installed.

## Project setup
```
yarn install
```

## DEV Mode
```
yarn electron:serve
```

## BUILD App
```
yarn electron:build
```

### Lints and fixes files
```
yarn run lint
```
