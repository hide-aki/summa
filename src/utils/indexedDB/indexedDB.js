const checkIndexeDBSupport = () => {
  let isSupported = true;
  if (!window.indexedDB) {
    isSupported = false;
  }
  return isSupported;
};

export default (namedb, version) => {
  let openDataBase = null;
  if (checkIndexeDBSupport()) {
    openDataBase = window.indexedDB.open(namedb, version);
  }

  return openDataBase;
};
