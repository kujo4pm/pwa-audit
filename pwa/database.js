import { openDB } from 'idb';
const DATABASE_NAME = 'pwa-data';
const SYNC_QUEUE_TABLE = 'sync-queue';

async function createDB() {
  // Using https://github.com/jakearchibald/idb
  const db = await openDB(DATABASE_NAME, 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
      // Switch over the oldVersion, *without breaks*, to allow the database to be incrementally upgraded.
    switch(oldVersion) {
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
  try {
    const cookies = {
      name: "Chocolate chips cookies",
      type: "dessert",
      cook_time_minutes: 25
    };
    const tx = await db.transaction("recipes", "readwrite");
    const store = tx.objectStore("recipes");
    store.add(cookies);
    await tx.done;
    showResult("Cookies added to the database");
  } catch (e) {
    showResult("Error while saving data to DB: " + e.message);
  }
}