const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");


const JWT_SECRET = "syedimranisagoodb$oy"
//ROUTE ....> 1
router.post("/createuser",
  [
    body("name", 'Enter a valid name').isLength({ min: 3 }),
    body("email", 'Enter a valid email').isEmail(),
    body("password", 'Password must be minimum 8 characters').isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "A user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password , salt);
      user = await User.create({
        Name: req.body.name,
        Email: req.body.email,
        Password: secPass
      });
      const data = {
        user: {
          id : user.id     
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log("User created successfully");
      res.json({ Authtoken: authtoken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    }
  }
);
// ROUTE ....> 2
router.post("/login",
  [
    body("email", 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ Email: email });
      if (!user) {
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.Password);
      if (!passwordCompare) {
      let Success = false;
        return res.status(400).json({Success: Success , error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id     
        }
      }; 
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log("User logged in successfully");
      let Success =true;
      res.json({success: Success ,  Authtoken: authtoken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE.....>> 3 get logged in  user details using : psot "/api/auth/getuser" , login required
router.post("/getuser", fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id; // Corrected: Access the user's ID using lowercase 'id'
      const user = await User.findById(userId).select("-password")
      res.send(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  }
);
module.exports = router;
