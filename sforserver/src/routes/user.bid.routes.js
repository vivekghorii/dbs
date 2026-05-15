const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const activeUser = require("../middleware/activeUser.middleware");
const role = require("../middleware/role.middleware");

const {
  getActiveBids,
  placeOrEditBid,
  getMyBidHistory,
  getMyBidResults,
} = require("../controller/user.bid.controller");

// USER only
router.use(auth);
router.use(activeUser);
router.use(role(["USER"]));

router.get("/active", getActiveBids);
router.post("/", placeOrEditBid);
router.get("/results", getMyBidResults);
router.get("/:bidId/history", getMyBidHistory);

module.exports = router;
