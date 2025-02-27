
import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@8/+esm';
const HOST_NAME = '127.0.0.1';
const SERVER_PORT = '8080';
const API_PATH = 'api';



const response = fetch('./assets/patient.fhir.json')
  .then(res => res.json())
  .then(patientJson => {
    inputField.value = JSON.stringify(patientJson);
  });


async function saveBodyForSync() {
  const inputData = inputField.value;

  try {
    // let's throw an error if it is not valid JSON before firing it out into the wild
    JSON.parse(inputData);
    const response = await fetch(`http://${HOST_NAME}:${SERVER_PORT}/${API_PATH}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      // send JSON data
      body: inputData,
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}

let db;

const DATABASE_NAME = 'pwa-data';
const SYNC_QUEUE_TABLE = 'sync-queue';

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
  try {
    const tx = await db.transaction(SYNC_QUEUE_TABLE, "readwrite");
    const store = tx.objectStore(SYNC_QUEUE_TABLE);
    store.add(fhirPatient);
    await tx.done;
    showResult(`Patient ${fhirPatient.id} added to the database`);
  } catch (e) {
    showResult("Error while saving data to DB: " + e.message);
  }
}

async function saveText() {
  const inputData = inputField.value;
  try {
    const fhirPatientJSON = JSON.parse(inputData);
    fhirPatientJSON.id = `${fhirPatientJSON.id}_${Date.now()}`;
    console.log(fhirPatientJSON);
    await addData(fhirPatientJSON);
  }
  catch (e) {
    showResult("Error while saving data to DB: " + e.message);
  }


}

const createButton = document.getElementById('create');
const sendButton = document.getElementById('send');
const inputField = document.getElementById('json-input');
const form = document.getElementById('json-to-send');
createButton.addEventListener("click", createDB);
sendButton.addEventListener("click", saveText);
function showResult(text) {
  document.querySelector("output").innerHTML = text;
}