const express = require("express");
const Basics = require("../models/basicinfo")
const bodyparser = require("body-parser");
const basicroute = express.Router();
const route = require("../routers/routes")
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