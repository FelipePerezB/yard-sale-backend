const express = require('express');
const routerAPI = require(`./routes`)
const {logErrors, errorHandler, boomErrorHandler} = require("./middlewares/error.handler")
const cors = require("cors");


// const whitelist = ["http://localhost:8080"]
// const options = {
//   origin: (origin, callback)=>{
//     if(whitelist.includes(origin)){
//       callback(null, true)
//     } else{
//       callback(boom.unauthorized("Acceso denegado"))
//     }
//   }
// }
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

routerAPI(app)


app.use(cors())
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

// PORT
app.listen(port, () => {
  console.log('Server is ready on http://localhost:' + port);
});