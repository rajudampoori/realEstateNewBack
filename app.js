const mongoose = require("mongoose");
const express = require("express");
// const router = require("./routers/routes")
const cors = require("cors");
const basicroute = require("./routers/basicinfo");
const listingroute = require("./routers/listings");
const validroute = require("./routers/validinfo");

mongoose.connect("mongodb+srv://root:root@cluster0.h3tpwio.mongodb.net/?retryWrites=true&w=majority")
.then(()=> {console.log("connection success")})
.catch((err)=> console.log(`Something went Wrong: ${err}`))


const app = express();
// app.use("/",router)
app.use(cors())
const port = process.env.PORT || 8000
require('./models/propertydetails')
require('./models/generalinfo')
require('./models/listing')

app.use(express.json());
app.use(require('./routers/routes'))
app.use(require('./routers/signup'))
app.use(require("./routers/login"))
app.use(require("./routers/logout"))
app.use("/",basicroute)
app.use("/",listingroute)
app.use("/",validroute)
app.use(require("./routers/propertydetails"))

app.listen(port,()=> {console.log(`Server is up at ${port}`)})