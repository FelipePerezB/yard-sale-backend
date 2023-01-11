const boom = require('@hapi/boom');
// const { config } = require('../config/config');

// const checkApiKey = (req, res, next) => {
//   const { api_key } = req.headers;
//   api_key === config.apiKey ? next() : next(boom.unauthorized('Send api_key in headers'));
// };

const checkRoles =
  (...roles) =>
  (req, res, next) => {
    const { user } = req;
    if (roles.includes(user.role)) next();
    else next(boom.forbidden());
  };

module.exports = { checkRoles };
