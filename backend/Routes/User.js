const express = require("express")
const signInCheck = require('../Middlewares/SigninCheck')

const router = express.Router()

router.get("/authStatus",signInCheck)

module.exports = router