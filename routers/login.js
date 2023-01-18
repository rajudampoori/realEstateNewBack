
var bcrypt = require("bcryptjs");

const cors = require("cors")
const express = require("express");
const Login = require("../models/login");
const bodyparser = require("body-parser");
const loginroute = express.Router();

loginroute.use(express.json());
loginroute.use(express.urlencoded({ extended: false }));
loginroute.use(cors());
loginroute.use(bodyparser())


loginroute.post("/login", async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;
    const userValid = await Login.findOne({ email });
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      // console.log(userValid)
      if (!isMatch) {
        return res.status(422).json({ message: "invalid details" });
      } else {
        // token generate
        const token = await userValid.generateAuthtoken();
        // cookiegenerate
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });
        const result = {
          userValid,
          token,
        };
        console.log(result)
    return res.status(201).json({ status: 201, result });
      }
    } else {
       res.json({ message: "User do not exist ,Please Signup" });
    }
  });


  module.exports = loginroute;