import dotenv from 'dotenv';
dotenv.config();

const PRODUCTION_DATABASE = 'mongodb://owner:productreview1@ds111063.mlab.com:11063/productreviewdb';
const TEST_DATABASE = 'mongodb://localhost/api-user-test';
// exports.DATABASE_URL =
//     process.env.DATABASE_URL ||
//     global.DATABASE_URL ||
//     'mongodb://localhost/jwt-auth-demo';
// exports.PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
export { 
  PRODUCTION_DATABASE,
  TEST_DATABASE,
  JWT_SECRET,
  JWT_EXPIRY
};
