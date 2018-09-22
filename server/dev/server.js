import express from 'express';
import appMiddleware from './middleware/appMiddleware';
import api from './api/api';
import { 
  PRODUCTION_DATABASE,
  TEST_DATABASE,
  PORT
} from './config/config';
import mongoose from 'mongoose';

const app = express();
let server;
//Use static assets
app.use(express.static('public'));

//load and use middlewares
appMiddleware(app, express);
//use express application and connect
api(app);

if (require.main === module) {
    mongoose.connect(PRODUCTION_DATABASE, err => {
      console.log('db connected.');
      if (err) {
        return console.log(err);
      }
      server = app.listen(process.env.PORT || 8080, (port = PORT) => {
        console.log(`Your app is listening on port ${port}`);
      })
        .on('error', err => {
          mongoose.disconnect();
          console.log(err);
        });
    });
}

export default app;