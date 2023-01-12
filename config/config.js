require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.SATABASE_URL,
  // apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  nodeMailerConfig: {
    host: process.env.NODEMAILER_HOST,
    email: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  }
};

module.exports = { config };
