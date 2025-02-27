import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@8/+esm';
const DATABASE_NAME = 'pwa-data';
const SYNC_QUEUE_TABLE = 'sync-queue';
let db;
async function createDB() {
  // Using https://github.com/jakearchibald/idb
  db = await openDB(DATABASE_NAME, 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
      // Switch over the oldVersion, *without breaks*, to allow the database to be incrementally upgraded.
      switch (oldVersion) {
        case 0:
        // Placeholder to execute when database is created (oldVersion is 0)
        case 1:
          // Create a store of objects
          const store = db.createObjectStore(SYNC_QUEUE_TABLE, {
            // The `id` property of the object will be the key, and be incremented automatically
            autoIncrement: true,
            keyPath: 'id'
          });
          // Create an index called `name` based on the `type` property of objects in the store
          store.createIndex('type', 'type');
      }
    }
  });
}

async function addData(fhirPatient) {
  const tx = await db.transaction(SYNC_QUEUE_TABLE, "readwrite");
  const store = tx.objectStore(SYNC_QUEUE_TABLE);
  store.add(fhirPatient);
  await tx.done;
}

// Using https://github.com/jakearchibald/idb
async function getUnsynchronizedRecords() {
  const tx = await db.transaction(SYNC_QUEUE_TABLE, 'readonly')
  const store = tx.objectStore(SYNC_QUEUE_TABLE);
  // Because in our case the `id` is the key, we would
  // have to know in advance the value of the id to
  // retrieve the record
  const value = await store.get('example_1740648580874');
  const unsynchronized = await store.getAll();
  return unsynchronized;
}


export { getUnsynchronizedRecords, createDB, addData };