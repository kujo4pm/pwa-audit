import { createDB, addData } from './database.js';




const response = fetch('./assets/patient.fhir.json')
  .then(res => res.json())
  .then(patientJson => {
    inputField.value = JSON.stringify(patientJson);
  });

async function saveText() {
  const inputData = inputField.value;
  try {
    const fhirPatientJSON = JSON.parse(inputData);
    fhirPatientJSON.id = `${fhirPatientJSON.id}_${Date.now()}`;
    console.log(fhirPatientJSON);
    await addData(fhirPatientJSON);
    showResult(`Patient ${fhirPatientJSON.id} added to the database`);
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