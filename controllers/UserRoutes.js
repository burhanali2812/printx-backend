const User = require("../models/User");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleWare = require("../authMiddleWare");

router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
            name, email, password: hashedPassword, role
        });
        await user.save();  
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
    
})



module.exports = router;