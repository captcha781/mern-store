const express = require("express")
const adminController = require("../Controllers/AdminController")
const adminAuthCheck = require("../Middlewares/AdminAuthCheck")

const router = express.Router()

router.get("/authStatus",adminAuthCheck,adminController.getAdminAuthStatus)

router.post("/signup", adminController.postAdminSignup)

module.exports = router