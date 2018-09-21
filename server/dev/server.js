import express from 'express';
import appMiddleware from './middleware/appMiddleware';
import api from './api/api';
import { 
  PRODUCTION_DATABASE,
  TEST_DATABASE 
} from './config/config';
import mongoose from 'mongoose';

const app = express();

//Use static assets
app.use(express.static('public'));

//Connect to test database
mongoose.connect(PRODUCTION_DATABASE, { useNewUrlParser: true }, (err) => {
  if(err) {
  console.log(err);
  } else {
    console.log('database has been connected.');
  }
});

//load and use middlewares
appMiddleware(app, express);
//use express application and connect
api(app);

export default app;