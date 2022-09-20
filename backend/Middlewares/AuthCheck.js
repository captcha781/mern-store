const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    
    const token = req.cookies["x-access-token"];
    if (!token) {
      return res.status(200).json({
        auth: false,
        message: "No signin data found, please signin...",
        redirect: "/signin",
      });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(200).json({
        auth: false,
        message: "Authorization verification failed, please login again...",
        redirect: "/signin",
      });
    }
    next()
  } catch (err) {
    res
      .status(500)
      .json({ auth: false, message: err.message, redirect: "/signin" });
  }
};


module.exports = adminAuth