const Shopkeeper = require("../models/Shopkeeper");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleWare = require("../authMiddleWare");

module.exports = router;