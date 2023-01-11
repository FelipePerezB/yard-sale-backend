const express = require('express');
const routerAPI = require(`./routes`);
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const cors = require('cors');
const { checkApiKey } = require('./middlewares/auth.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/tests', checkApiKey, (req, res) => {
  res.json({ funciona: true });
});

require('./utils/auth')
routerAPI(app);

app.use(cors());
app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);

// PORT
app.listen(port, () => {
  console.log('Server is ready on http://localhost:' + port);
});
