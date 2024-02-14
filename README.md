# SimFlightInfo v2 🛩 🌍

SimFlightInfo is a desktop ppp that listens to the position information from Micrososft Flight Simulator™ (MSFS2020)  – forwarded over the network by [EFBConnect](https://github.com/ollyau/EFBConnect/releases) – and displays the current airplane location on a map.

Additionally it displays the name and the flag of the country your airplane is located at and shows links to Wikipedia articles nearby (20 km).

You can try this app in simulation mode without running simulator.

## Prerequisite

Install [EFBConnect](https://github.com/ollyau/EFBConnect/releases) on the same computer as the simulator is running.

- If you plan to use SimFlightInfo on the same computer as the simulator is running, configure EFBConnect to send the data to 127.0.0.1.
- If you plan to use SimFlightInfo on another computer (in the same local network), use the IP address of that computer in EFBConnect.

## Installation & Usage

Download and install the [latest release](https://github.com/ahles/SimFlightInfo/releases/latest) (win & mac) of SimFlightInfo.

Or you can build your own for your operating system following the development & build instructions at the bottom of this document.

## Recommended

To be able to display the info panel with the country information, flag and Wikipedia links, you need a [Geonames](http://www.geonames.org/) account. You can register it for free [here](https://www.geonames.org/login). Please enter your [Geonames](http://www.geonames.org/) username in the settings panel of SimFlightInfo.

---

![Screenshot](/docs/screenshot.png?raw=true "SimFlightInfo Screenshot")

---

## Used boilerplate: electron-vite-vue

🥳 Really simple `Electron` + `Vue` + `Vite` boilerplate.

### Features

📦 Out of the box  
🎯 Based on the official [template-vue-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue-ts), less invasive  
🌱 Extensible, really simple directory structure  
💪 Support using Node.js API in Electron-Renderer  
🔩 Support C/C++ native addons  
🖥 It's easy to implement multiple windows  

### Quick Setup

```sh
# clone the project
git clone https://github.com/electron-vite/electron-vite-vue.git

# enter the project directory
cd electron-vite-vue

# install dependency
npm install

# develop
npm run dev
```

### standalone vue-devtools

Couldn't get vue devtools installer running within electron 2024-02-14

https://devtools.vuejs.org/guide/installation.html#using-global-package

```shell
npm install -g @vue/devtools
```

Remove CSP meta tag in index.html head and insert
```shell
<script src="http://localhost:8098"></script>
```

then ```npm run dev```


### Debug

![electron-vite-react-debug.gif](https://github.com/electron-vite/electron-vite-react/blob/main/electron-vite-react-debug.gif?raw=true)

### Directory

```diff
+ ├─┬ electron
+ │ ├─┬ main
+ │ │ └── index.ts    entry of Electron-Main
+ │ └─┬ preload
+ │   └── index.ts    entry of Preload-Scripts
  ├─┬ src
  │ └── main.ts       entry of Electron-Renderer
  ├── index.html
  ├── package.json
  └── vite.config.ts
```

<!--
## Be aware

🚨 By default, this template integrates Node.js in the Renderer process. If you don't need it, you just remove the option below. [Because it will modify the default config of Vite](https://github.com/electron-vite/vite-plugin-electron-renderer#config-presets-opinionated).

```diff
# vite.config.ts

export default {
  plugins: [
-   // Use Node.js API in the Renderer-process
-   renderer({
-     nodeIntegration: true,
-   }),
  ],
}
```
-->

### FAQ

- [C/C++ addons, Node.js modules - Pre-Bundling](https://github.com/electron-vite/vite-plugin-electron-renderer#dependency-pre-bundling)
- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron-renderer#dependencies-vs-devdependencies)
