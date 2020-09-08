const storage = require('electron-json-storage');

const storageKey = 'settings';

// const defaultDataPath = storage.getDefaultDataPath();
// console.log('defaultDataPath', defaultDataPath);

/**
 * Windows path:
 * C:\Users\USERNAME\AppData\Roaming\whereismyplane\storage
 *
 * Mac path:
 * /Users/USERNAME/Library/Application Support/whereismyplane/storage
 */

const jsonStorage = (store) => {
  store.subscribe((mutation, state) => {
    if (
      mutation.type === 'SET_LOCALE'
      || mutation.type === 'SET_ZOOM_LEVEL'
      || mutation.type === 'SET_MAP_LOCKED_TO_POSITION'
      || mutation.type === 'SET_GEONAMES_USER'
    ) {
      storage.set(storageKey, state);
    }
  });
};

export default jsonStorage;
