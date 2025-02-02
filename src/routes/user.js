const express = require("express")
const router = express.Router()
const { handleSignUp, handleLogIn } = require("../controllers/user");

router.post("/sign-up", handleSignUp)
router.post("/login", handleLogIn)

module.exports = router