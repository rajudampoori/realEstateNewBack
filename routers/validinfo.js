const express = require("express");
const Login = require("../models/login")
const bodyparser = require("body-parser");
const validroute = express.Router();
const authenticate = require("../middleware/authenticate");

const route = require("../routers/routes")
validroute.use(bodyparser())

validroute.get("/validuser", authenticate, async (req, res) => {
    try {
        console.log("i am here")
      const ValidUserOne = await Login.findOne({ _id: req.userId });
      return res.status(201).json({ status: 201, ValidUserOne });
    } catch (error) {
      return res.status(401).json({ status: 401, error });
    }
  });

  module.exports = validroute;