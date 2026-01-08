const { register, login, profile } = require("../controller/user.controller");

const router = require("express").Router();



router.post("/register", register);

router.post("/login", login);

router.get("/profile", profile);

module.exports = router;