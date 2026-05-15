const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const {
  createBid,
  getBids,
  updateBidStatus,
  getDashboardBids,
} = require("../controller/bid.controller");

router.use(auth);
router.use(role(["ADMIN"]));

// Define parameterized routes before root routes
router.put("/:bidId/status", updateBidStatus);
router.patch("/:bidId/status", updateBidStatus);
router.get("/dashboard", getDashboardBids);
router.post("/", createBid);
router.get("/", getBids);

module.exports = router;
