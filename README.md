# SimFlightInfo v2 🛩 🌍

SimFlightInfo is a desktop ppp that listens to the position information from Micrososft Flight Simulator™ (MSFS2020) and displays the current airplane location on a map.

Additionally it can display the name and the flag of the country your airplane is located at and shows links to Wikipedia articles nearby (20 km), if you create a [Geonames](http://www.geonames.org/) username and configure it in the app settings.

## Installation & Usage

Download and install the [latest release](https://github.com/ahles/SimFlightInfo/releases/latest) (win) of SimFlightInfo.

Or you can build your own for your operating system following the development & build instructions at the bottom of this document.

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

```shell
vue-devtools
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
