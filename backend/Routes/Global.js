const express = require("express")
const signInCheck = require('../Middlewares/SigninCheck')
const AuthCheck = require("../Middlewares/AuthCheck")
const globalController = require("../Controllers/GlobalController")

const router = express.Router()

router.get("/getAuthStatus",AuthCheck, globalController.getAuthStatus )

module.exports = router