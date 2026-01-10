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
const userModel = require("../models/user.models");

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

// Get all users
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const users = await userModel.find().select("-password");
      res.status(200).send({
        status: true,
        users,
      });
    } catch (error) {
      console.error("Get all users error:", error);
      res.status(500).send({
        status: false,
        message: "Failed to fetch users",
      });
    }
  }
);

// Get user by ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id).select("-password");

      if (!user) {
        return res.status(404).send({
          status: false,
          message: "User not found",
        });
      }

      res.status(200).send({
        status: true,
        user,
      });
    } catch (error) {
      console.error("Get user by ID error:", error);
      res.status(500).send({
        status: false,
        message: "Failed to fetch user",
      });
    }
  }
);

module.exports = router;
