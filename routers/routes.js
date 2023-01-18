const mongoose = require("mongoose");
const express = require("express");
const General = require("../models/generalinfo")
const Estate = require("../models/listing")
var bcrypt = require("bcryptjs");
const validator = require("express-validator");
const bodyparser = require("body-parser");
const cors = require("cors");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: false }));
route.use(cors());
const superConstant = new Map();
var superCount = 1100;
var newPPDID = '';

route.post("/api/basicinfo/propertydetails/generalinfo/posts",async (req, res) => {
    try {
      const postData = new General({
        image: req.body.image,
        mobile: req.body.mobile,
      });
      await postData.save();
      superConstant.set("image", req.body.image)
      superConstant.set("contact", postData.mobile);
      //random Views and Days
      function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }
      await superConstant.set("views", randomNumber(0, 100));
      await superConstant.set("daysleft", randomNumber(0, 30));
      //Incremental ppdid
      let textInitial = "PPD";
      let resultPPDID = textInitial.concat(parseInt(superCount + 1));
      var recordsLength = 0;
      const details = await Estate.find().limit(1).sort({$natural:-1}) ;
      if (parseInt(details.length) < 1) {
        console.log('I am here');
        const addPPDID = new Estate({
          ppdid: resultPPDID,
          image: superConstant.get("image"),
          property: superConstant.get("property"),
          contact: superConstant.get("contact"),
          area: superConstant.get("area"),
          views: superConstant.get("views"),
          daysleft: superConstant.get("daysleft"),
        }).save();
        superConstant.clear();
      } else if(parseInt(details.length) >= 1) {
        console.log('I am else if');
        const propertyDetail = await Estate.find().limit(1).sort({$natural:-1})
          .then((data) => {
            console.log(`DADAF: ${data.ppdId}`)
            var newPPDID = '';
            res.status(200).json({ data });
            console.log(`Stll string :${data.ppdid}`)
            const lastPPDID = JSON.stringify(data[0].ppdid);
            console.log(lastPPDID);
            const newNumber = parseInt(lastPPDID.split('PPD')[1]) + 1;
            newPPDID = "PPD".concat(newNumber);
            console.log(newPPDID)
            const addPPDID = new Estate({
              ppdid: newPPDID,
              image: superConstant.get("image"),
              property: superConstant.get("property"),
              contact: superConstant.get("contact"),
              area: superConstant.get("area"),
              views: superConstant.get("views"),
              daysleft: superConstant.get("daysleft"),
            }).save();
            superConstant.clear();
          })
          .catch((err) => console.log(err));
      }
      //when there are no records
  
    } catch (error) {
  return   res.status(400).json({
        status : "failed",
        message : error.message
      })
    }
  }
);

route.get("/images/:name", (req, res) => {
  const fileName = req.params.name;
  res.sendFile(__dirname + "/images/" + fileName);
  console.log(fileName);
  console.log(__dirname);
});

//find the data by PPDID
route.post("/searchppdid", async (req, res) => {
  const propertyDetail = await Estate.findOne({ superId: req.body.ppdId })
    .then((data) => {
      res.status(200).json({ data });
      console.log(data);
    })
    .catch((err) => console.log(err));
});


module.exports = route;
