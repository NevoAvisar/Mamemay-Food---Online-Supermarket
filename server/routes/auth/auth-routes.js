const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");
const {
  validateRegistration,
  validateLogin,
} = require("../../validations/auth");

const router = express.Router();

router.post("/register", validateRegistration, registerUser);
router.post("/login", validateLogin, loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
