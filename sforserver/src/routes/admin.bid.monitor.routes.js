const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const {
  viewBidsByDiamond,
  declareResult,
} = require("../controller/admin.bid.monitor.controller");

// ADMIN only
router.use(auth);
router.use(role(["ADMIN"]));

// View all bids + highest bid
router.get("/:bidId", viewBidsByDiamond);

// Declare result
router.post("/:bidId/declare", declareResult);

module.exports = router;
