const storage = require('electron-json-storage');
// const defaultDataPath = storage.getDefaultDataPath();
// console.log('defaultDataPath', defaultDataPath);

let storageKey = null;
export const setJsonStorageKey = (key) => {
  storageKey = key;
};

let jsonStorageMutations = null;
export const setJsonStorageMutations = (mutations) => {
  jsonStorageMutations = mutations;
};

/**
 * Windows path:
 * C:\Users\USERNAME\AppData\Roaming\whereismyplane\storage
 *
 * Mac path:
 * /Users/USERNAME/Library/Application Support/whereismyplane/storage
 */
export const jsonStoragePlugin = (store) => {
  store.subscribe((mutation, state) => {
    if (jsonStorageMutations.includes(mutation.type)) {
      storage.set(storageKey, state);
    }
  });
};
