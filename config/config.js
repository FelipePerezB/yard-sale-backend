const env = process.env.NODE_ENV || 'dev';

const envs = {
  'dev': '.env',
  'e2e': '.env.test'
};

const options = {};

if (envs[env]) {
  options.path = envs[env];
}

require('dotenv').config(options);

const config = {
  env,
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  // apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  nodeMailerConfig: {
    host: process.env.NODEMAILER_HOST,
    email: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  }
};

module.exports = { config };
