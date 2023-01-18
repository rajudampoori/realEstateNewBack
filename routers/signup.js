const cors = require("cors")
const express = require("express");
const Login = require("../models/login");
const bodyparser = require("body-parser");
const signuproute = express.Router();

signuproute.use(express.json());
signuproute.use(express.urlencoded({ extended: false }));
signuproute.use(cors());
signuproute.use(bodyparser())

signuproute.post("/signup",async (req, res) => {
    const { email, password, cpassword } = req.body;
    if (!email || !password || !cpassword) {
          res.status(422).json({ error: "fill all the details" });
    }
    try {
      const preuser = await Login.findOne({ email: email });
      if (preuser) {
          res.status(422).json({ message: "This Email, Already Exist" });
      } else if (password !== cpassword) {
          res.status(422).json({ error: "Password and Confirm Password Not Match" });
      } else {
        const finalUser = new  Login({
          email,
          password,
          cpassword,
        });
        // here password hasing
        const storeData = await finalUser.save();
        return   res.status(201).json({ status: 201, storeData });
      }
    } catch (error) {
        res.status(422).json(error);
      console.log("catch block error");
    }
  }
);

module.exports = signuproute;