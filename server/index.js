import express from 'express';
import bodyParser from 'body-parser';

const FRONT_END_ROOT = '/pwa';
const FRONT_END_DIR = './pwa';
const app = express();
// create application/json parser
const jsonParser = bodyParser.json();
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use((req, res, next) => {
  if (req.url.indexOf(FRONT_END_ROOT) !== -1) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Service-Worker-Allowed', '/');
  }
  next();
});
app.use(FRONT_END_ROOT, express.static(FRONT_END_DIR));

const SERVER_PORT = '8080'
console.log('Starting server...');
app.post('/', (req, res) => {
  const { body, method } = req;
  console.log({ body, method });
  // res.setHeader('Content-Type', 'application/json');
  // res.sendStatus(200);
  res.send(JSON.stringify({
    header: true,
  }));
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}`)
});