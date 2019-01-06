# xpvuemap

Work in progress

## Project setup
```
yarn install
```

## Run server

The server receives (UDP), evaluates and forwards (socket.io) the information sent by X-Plane.

```
yarn run server
```

## Run client

At the moment, the client is a Vue.js development server that receives the X-Plane information (socket.io) and displays the map.


### Compiles and hot-reloads for development
```
yarn run client
```

#### Compiles and minifies for production
```
yarn run build
```

#### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn# run lint
```

### Run your unit tests
```
yarn# run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
