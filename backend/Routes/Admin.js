const express = require("express");
const adminController = require("../Controllers/AdminController");
const adminAuthCheck = require("../Middlewares/AuthCheck");
const adminSignCheck = require("../Middlewares/SigninCheck");

const router = express.Router();

router.get("/authStatus", adminAuthCheck, adminController.getAdminAuthStatus);

router.post("/signup", adminSignCheck, adminController.postAdminSignup);

router.post("/signout", adminController.signoutAdmin);

router.post("/signin", adminSignCheck ,adminController.postLogin);

module.exports = router;
