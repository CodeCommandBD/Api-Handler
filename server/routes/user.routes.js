const {
  register,
  login,
  profile,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteAccount,
} = require("../controller/user.controller");
const passport = require("passport");

const router = require("express").Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes - require JWT token
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profile
);

router.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);

router.patch(
  "/email",
  passport.authenticate("jwt", { session: false }),
  updateEmail
);

router.patch(
  "/password",
  passport.authenticate("jwt", { session: false }),
  updatePassword
);

router.delete(
  "/account",
  passport.authenticate("jwt", { session: false }),
  deleteAccount
);

module.exports = router;
