
const HOST_NAME = '127.0.0.1';
const SERVER_PORT = '8080';
const API_PATH = 'api';

const inputField = document.getElementById('json-input');
const form = document.getElementById('json-to-send');

const response = fetch('./assets/patient.fhir.json')
  .then(res => res.json())
  .then(patientJson => {
    inputField.value = JSON.stringify(patientJson);
  });


async function sendBody() {
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

const sendButton = document.getElementById('send');
sendButton.addEventListener("click", sendBody);
