const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.get(
  "/admin-data",
  authenticateUser,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Admin data access granted", user: req.user });
  }
);

module.exports = router;
