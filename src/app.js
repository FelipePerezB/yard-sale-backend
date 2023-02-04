const createApp = () => {
  const express = require('express');
  const routerAPI = require(`./../routes`);
  const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('../middlewares/error.handler');
  const cors = require('cors');
  // const useGraphql = require('./graphql');
  // const { checkApiKey } = require('./middlewares/auth.handler');
  const app = express();
  app.use(express.json())
  require('../utils/auth');
  routerAPI(app);

  // useGraphql();

  app.use(cors());
  app.use(logErrors);
  app.use(boomErrorHandler);
  app.use(ormErrorHandler);
  app.use(errorHandler);
  return app
}


module.exports=createApp
