const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const {
  createUser,
  getAllUsers,
  toggleUserStatus,
} = require("../controller/admin.user.controller");

// Admin only routes
router.use(authMiddleware);
router.use(roleMiddleware(["ADMIN"]));

router.post("/users", createUser);
router.get("/users", getAllUsers);
router.patch("/users/:userId/status", toggleUserStatus);

module.exports = router;
