const createApp = require("./src/app");

const port =  process.env.PORT || 3000;
const app = createApp()

// PORT
app.listen(port, () => {
  console.log('Server is ready on http://localhost:' + port+', GraphQL in http://localhost:4000');
});
