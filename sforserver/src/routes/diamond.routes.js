const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const {
  createDiamond,
  getDiamonds,
} = require("../controller/diamond.controller");

router.use(auth);
router.use(role(["ADMIN"]));

router.post("/", createDiamond);
router.get("/", getDiamonds);

module.exports = router;
