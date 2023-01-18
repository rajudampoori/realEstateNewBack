const mongoose = require("mongoose")
const express = require("express");
const Properties = mongoose.model("Properties");

const bodyparser = require("body-parser");
const cors = require("cors");
const propertyroute = express.Router();

propertyroute.use(express.json());
propertyroute.use(express.urlencoded({ extended: false }));
propertyroute.use(cors());
propertyroute.use(bodyparser())
const superConstant = new Map();

propertyroute.post("/api/basicinfo/posts", async (req, res) => {
    try {
      const posts = await Properties.create(req.body);
      res.json({
        status: "Success",
        posts: posts,
      });
      superConstant.set("area", posts.totalArea);
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  });

  module.exports = propertyroute;