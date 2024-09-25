// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/signup", (req, res) => res.render("signup", { error: null }));
router.post("/signup", authController.signUp);

router.get("/login", (req, res) => res.render("login", { error: null }));
router.post("/login", authController.login);

router.get("/profile", authController.profile);

module.exports = router;
