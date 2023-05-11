const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  listUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

//register
router.post("/", registerUser);

//all users list
router.get("/users", listUser);

//login
router.post("/login", loginUser);
//user info
router.get("/me", protect, getMe);

module.exports = router;
