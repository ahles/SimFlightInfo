# SimFlightInfo 🛩 🌍

SimFlightInfo is a desktop ppp that listens to the position information from Micrososft Flight Simulator™ (MSFS2020)  – forwarded over the network by [EFBConnect](https://github.com/ollyau/EFBConnect/releases) – and displays the current airplane location on a map.

Additionally it displays the name and the flag of the country your airplane is located at and shows links to Wikipedia articles nearby (20 km).

You can try this app in simulation mode without running simulator.

## Installation & Usage

Download and install the [latest release](https://github.com/ahles/SimFlightInfo/releases/latest) (win & mac) of SimFlightInfo.

Or you can build your own for your operating system following the development & build instructions at the bottom of this document.

## Prerequisite

Install [EFBConnect](https://github.com/ollyau/EFBConnect/releases) on the same computer as the simulator is running.

- If you plan to use SimFlightInfo on the same computer as the simulator is running, configure EFBConnect to send the data to 127.0.0.1.
- If you plan to use SimFlightInfo on another computer (in the same local network), use the IP address of that computer in EFBConnect.

## Recommended

To be able to display the info panel with the country information, flag and Wikipedia links, you need a [Geonames](http://www.geonames.org/) account. You can register it for free [here](https://www.geonames.org/login). Please enter your [Geonames](http://www.geonames.org/) username in the settings panel of SimFlightInfo.

---

![Screenshot](/docs/screenshot.png?raw=true "SimFlightInfo Screenshot")

---

## Development & build instructions

### Project setup
```
npm install
```

### DEV Mode
```
npm run electron:serve
```

### BUILD App
```
npm run electron:build
```

### Lints and fixes files
```
npm run lint
```
