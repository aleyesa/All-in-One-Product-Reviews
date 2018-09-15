import express from 'express';
import appMiddleware from './middleware/appMiddlware';
import api from './api/api';
import { TEST_DATABASE } from './config/config';
import mongoose from 'mongoose';

const app = express();
let server;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/public/index.html');
  res.status(200).json(res.statusMessage);
});

mongoose.connect(TEST_DATABASE, { useNewUrlParser: true }, (err) => {
  if(err) {
  console.log(err);
  } else {
    console.log('database has been connected.');
  }
});

appMiddleware(app, express);
api(app);

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      })
      .on("error", err => {
        reject(err);
      });
  });
};

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

export { app,
   runServer,
   closeServer };