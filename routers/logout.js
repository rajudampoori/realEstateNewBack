const authenticate = require("../middleware/authenticate");
const cors = require("cors")
const express = require("express");
const bodyparser = require("body-parser");
const logoutroute = express.Router();

logoutroute.use(express.json());
logoutroute.use(express.urlencoded({ extended: false }));
logoutroute.use(cors());
logoutroute.use(bodyparser())

logoutroute.get("/logout", authenticate, async (req, res) => {
    try {
      req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
        return curelem.token !== req.token;
      });
      res.clearCookie("usercookie", { path: "/" });
      req.rootUser.save();
      res.status(201).json({ status: 201 });
    } catch (error) {
      res.status(401).json({ status: 401, error });
    }
  });

  module.exports = logoutroute;