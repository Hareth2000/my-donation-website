const express = require("express");
const authRoute = express.Router();
const verify = require("../middlewares/verify");
const {
  register,
  login,
  logout,
  googleLogin,
  googleRegister,
} = require("../controller/authController");

authRoute.post("/register", register);

authRoute.post("/login", login);

authRoute.post("/logout", logout);

authRoute.post("/google-login", googleLogin);

authRoute.post("/google-register", googleRegister);

authRoute.get("/check", verify, (req, res) => {
  res.status(200).json({ message: "API is working" });
});

module.exports = authRoute;
