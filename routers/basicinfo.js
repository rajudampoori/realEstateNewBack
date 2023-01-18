// const mongoose = require("mongoose")
const express = require("express");
// const Basics = mongoose.model("Basics");
const Basics = require("../models/basicinfo")
const bodyparser = require("body-parser");
// const cors = require("cors");
const basicroute = express.Router();
const route = require("../routers/routes")
// basicroute.use(express.json());
// basicroute.use(express.urlencoded({ extended: false }));
// basicroute.use(cors());
basicroute.use(bodyparser())

const superConstant = new Map();

basicroute.post("/api/posts", async (req, res) => {
    try {
      const posts = await Basics.create(req.body);
      res.json({
        status: "Success",
        posts: posts,
      });
      superConstant.set("property", posts.propertyType);
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  });

  module.exports = basicroute;