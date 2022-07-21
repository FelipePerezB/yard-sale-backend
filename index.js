const express = require('express');
const routerAPI = require(`./routes`);
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

routerAPI(app);

app.use(cors());
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// PORT
app.listen(port, () => {
  console.log('Server is ready on http://localhost:' + port);
});
