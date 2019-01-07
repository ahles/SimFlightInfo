# xpvuemap

Electron-APP that listens to the position information sent by X-Plane 11 (over UDP) and displays the current location on a map.

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


## Notes

- how handle uws deprecated?
https://www.npmjs.com/package/uws

- (node:5704) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.