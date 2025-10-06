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
        if (user) {
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
router.post("/login", async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const user = await User.findOne({ email: email, role: role });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials Or Role" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign({ user: { id: user.id, role: user.role } }, process.env.JWT_SECRET, { expiresIn: "23h" });
        const userData = {
            id: user.id, 
            name: user.name,
             email: user.email, 
             role: user.role
        }
        res.status(200).json({success : true, token: token , message: "Login Successful", userData });
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }

})



module.exports = router;