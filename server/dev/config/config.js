import dotenv from 'dotenv';
dotenv.config();

const PRODUCTION_DATABASE = 'mongodb://owner:productreview1@ds111063.mlab.com:11063/productreviewdb';
const TEST_DATABASE = 'mongodb://localhost/api-user-test';

const JWT_SECRET = process.env.JWT_SECRET || 'password';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
const PORT = process.env.PORT || 8080;
export { 
  PRODUCTION_DATABASE,
  TEST_DATABASE,
  PORT,
  JWT_SECRET,
  JWT_EXPIRY
};
