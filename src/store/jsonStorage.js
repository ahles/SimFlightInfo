const storage = require('electron-json-storage');

const storageKey = 'settings';

/**
 * Windows path:
 * C:\Users\USERNAME\AppData\Roaming\whereismyplane\storage
 */

const jsonStorage = (store) => {
  store.subscribe((mutation, state) => {
    if (
      mutation.type === 'SET_LOCALE'
      || mutation.type === 'UPDATE_ZOOM_LEVEL'
      || mutation.type === 'UPDATE_MAP_LOCKED_TO_POSITION'
    ) {
      storage.set(storageKey, state);
    }
  });
};

export default jsonStorage;
