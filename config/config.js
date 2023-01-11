require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.RAILWAY_PORT || 3000,
  dbUrl: process.env.RAILWAY_DATABASE_URL,
  // apiKey: process.env.API_KEY,
  jwtSecret: process.env.API_KEY,
  nodeMailerConfig: {
    host: process.env.NODEMAILER_HOST,
    email: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  }
};

module.exports = { config };
