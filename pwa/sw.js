import { createDB, getUnsynchronizedRecords } from './database.js';
const CACHE_NAME = `temperature-converter-v1`;
const HOST_NAME = 'localhost';
const SERVER_PORT = '8080';
const API_PATH = 'api';
const SW_VERSION = '1.0.0';

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '.',
      './formHandler.js',
      './styling.css',
      './assets/patient.fhir.json',
    ]);
  })());
});

async function sendUnsynchronized() {
  await createDB();
  const unsynchronizedRecords = await getUnsynchronizedRecords();
  console.log({ unsynchronizedRecords });
  await saveBodyForSync(unsynchronizedRecords);
}

async function fetchRecordsFromServer() {
  try {
    const response = await fetch(`http://${HOST_NAME}:${SERVER_PORT}/${API_PATH}/patient`);
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}
const SYNC_COMPLETE_MESSAGE = 'SYNC_COMPLETE_MESSAGE'; 
self.addEventListener('sync', event => {
  if (event.tag === 'TRIGGER_SYNC') {
    console.log('message received by service worker');
    event.waitUntil(sendUnsynchronized());
  }
});

self.addEventListener('periodicsync', event => {
  console.log('Running periodic sync');
  if (event.tag === 'PERIODIC_SYNC') {
    // event.waitUntil(Promise.all(sendUnsynchronized(), fetchRecordsFromServer()));
    event.waitUntil(fetchRecordsFromServer());
  }
});


async function saveBodyForSync(dataToPost) {
  try {
    const response = await fetch(`http://${HOST_NAME}:${SERVER_PORT}/${API_PATH}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      // send JSON data
      body: JSON.stringify(dataToPost),
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}
self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
      try {
        // If the resource was not in the cache, try the network.
        const fetchResponse = await fetch(event.request);

        // Save the resource in the cache and return it.
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        // The network failed.
        console.log('Failed...');
      }
    }
  })());
});