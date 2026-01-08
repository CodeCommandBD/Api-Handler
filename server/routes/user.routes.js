const { register, login, profile } = require("../controller/user.controller");
const passport = require("passport");

const router = require("express").Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route - requires JWT token
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profile
);

module.exports = router;
