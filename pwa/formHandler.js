
const HOST_NAME = '127.0.0.1';
const SERVER_PORT = '8080';

const inputField = document.getElementById('json-input');
const form = document.getElementById('json-to-send');

const response = fetch('./assets/patient.fhir.json')
  .then(res => res.json())
  .then(patientJson => {
    inputField.value = JSON.stringify(patientJson);
  });


async function sendBody() {
  const inputData = inputField.value;
  console.log({ inputData });
  try {
    const jsonifiedData = JSON.parse(inputData);
    const response = await fetch(`http://${HOST_NAME}:${SERVER_PORT}`, {
      method: "POST",
      // Set the FormData instance as the request body
      body: jsonifiedData,
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}

const sendButton = document.getElementById('send');
sendButton.addEventListener("click", sendBody);
