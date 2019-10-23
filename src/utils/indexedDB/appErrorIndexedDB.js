import database from './indexedDB';

const request = database('app-errors', 2);

let db;

request.onsuccess = (event) => {
  db = event.target.result;
};

request.onerror = (event) => {
  db = event.target.result;
};

request.onupgradeneeded = (event) => {
  // Save the IDBDatabase interface
  db = event.target.result;
  // Create an object store for this database called "error" with the autoIncrement flag set as true.
  const objectStore = db.createObjectStore('error', { autoIncrement: true });
  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex('errorType', 'errorType', { unique: false });
};

export const createError = (error) => {
  return
  const tx = db
    .transaction('error', 'readwrite')
    .objectStore('error')
    .add(error);

  tx.onsuccess = (event) => {};

  tx.onerror = (event) => {};
};
export const readError = () => {
  const tx = db.transaction('errors').objectStore('error');
  const errors = [];
  tx.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;

    if (cursor) {
      errors.push(cursor.value.name);
      cursor.continue();
    }
  };
};
