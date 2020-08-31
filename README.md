# Whereismyplane 🛩 🌍

Whereismyplane is a Desktop-App that listens to the position information from Micrososft Flight Simulator™  – forwarded over the network by [EFBConnect](https://github.com/ollyau/EFBConnect/releases) – and displays the current airplane location on a map.

You can try this app in simulation mode without running simulator.

## Installation & Usage

Install [EFBConnect](https://github.com/ollyau/EFBConnect/releases) on the same computer as the simulator is running.

- If you plan to use this app on the same computer, configure EFBConnect to send the data to 127.0.0.1.
- If you plan to use this app on another computer (in the same local network), use the IP address of that computer in EFBConnect.

You can download and install the [latest release](https://github.com/ahles/whereismyplane/releases/latest) (win & mac).

Or you can build your own for your operating system following the development & build instructions at the bottom of this document.

---

![Screenshot](/docs/screenshot.png?raw=true "Whereismyplane Screenshot")

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
