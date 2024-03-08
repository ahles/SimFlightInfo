# SimFlightInfo v2 🛩 🌍

SimFlightInfo is a desktop app that listens to the position information from Micrososft Flight Simulator™ (MSFS2020) running on the same computer and displays the current airplane location on a map.

Additionally it can display the name and the flag of the country your airplane is located at and shows links to Wikipedia articles nearby (20 km), if you create a [Geonames](http://www.geonames.org/) username and configure it in the app settings.

**New:**
- No further dependency needed, but must now run on the same computer as the flight simulator
- Wikipedia link locations can be displayed on the map

## Installation & Usage

Download and install the [latest release](https://github.com/ahles/SimFlightInfo/releases/latest) (win) of SimFlightInfo.

Or you can build your own for your operating system following the development & build instructions below.

---

![Screenshot](/docs/screenshot.png?raw=true "SimFlightInfo Screenshot")

---

## Used boilerplate: electron-vite-vue

🥳 Really simple `Electron` + `Vue` + `Vite` boilerplate:

[electron-vite/electron-vite-vue](https://github.com/electron-vite/electron-vite-vue)

### Development & build instructions

Install dependencies:
```shell
npm install
```

Running the dev server:
```shell
npm run dev
```
This starts the dev-server and the standalone [Vue Devtools](https://devtools.vuejs.org/). For more information about the Vue Devtools see below.

Linting the app with Eslint:
```shell
npm run  lint
```

Formatting the code (with Prettier):
```shell
npm run format
```

Building the app:
```shell
npm run build
```

### Vue Devtools

[Vue Devtools](https://devtools.vuejs.org/) is installed as a dev-dependency.

For the dev-server, a different index.html file is used ([index_devtools.html](./index_devtools.html)) in which a CSP-header is removed and the script include for the Vue Devtools is configured. See [Vue Devtools Standalone](https://devtools.vuejs.org/guide/installation.html#standalone)

For the build process, the regular [index.html](./index.html) is used.
