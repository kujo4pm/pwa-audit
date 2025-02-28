import express from 'express';
import patientJson from '../pwa/assets/patient.fhir.json' with { type: "json" };

const FRONT_END_ROOT = '/pwa';
const FRONT_END_DIR = './pwa';
const app = express();

// handle CORS for static webserver
app.use((req, res, next) => {
  if (req.url.indexOf(FRONT_END_ROOT) !== -1) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Service-Worker-Allowed', '/');
  }
  next();
});
app.use(FRONT_END_ROOT, express.static(FRONT_END_DIR));
app.use('/favicon.ico', express.static('./favicon.ico'));

const SERVER_PORT = '8080'
console.log('Starting server...');
app.post('/api', express.json(), (req, res) => {
  const { body, method } = req;
  console.log({ method, body });
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send({
    syncComplete: true,
  });
});

app.get('/api/patient', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  console.log('Sending new records from server');
  res.send({
    recordCount: 1,
    records: [
      {
        id: `${patientJson.id}_${Date.now()}`,
        isSynchronized: Date.now(),
        payload: patientJson,
      }
    ]
  });
});
app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}`)
});