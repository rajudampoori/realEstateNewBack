const express = require("express");
const bodyparser = require("body-parser");
const listingroute = express.Router();
listingroute.use(bodyparser())
const Estate = require("../models/listing")

listingroute.get("/listing", async (req, res) => {
    await Estate.find()
      .then((data) => {
        if(parseInt(data.length < 1)){
          res.status(200).json({message:'No data'})
        } else{
          res.status(200).json({ data });
        }
      })
      .catch((err) => console.log(err));
  });

module.exports = listingroute;