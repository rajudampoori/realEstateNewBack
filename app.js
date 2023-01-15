const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors")

mongoose.connect("mongodb+srv://root:root@cluster0.h3tpwio.mongodb.net/?retryWrites=true&w=majority")
.then(()=> {console.log("connection success")})
.catch((err)=> console.log(`Something went Wrong: ${err}`))

const app = express();
app.use(cors())
const port = process.env.PORT || 8000
require('./models/basicinfo')
require('./models/propertydetails')
require('./models/generalinfo')
require('./models/listing')

app.use(express.json());
app.use(require('./routers/routes'))
app.listen(port,()=> {console.log(`Server is up at ${port}`)})