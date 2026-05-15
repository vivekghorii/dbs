const User = require("./User");
const Diamond = require("./Diamond");
const Bid = require("./Bid");
const UserBid = require("./UserBid");
const BidHistory = require("./BidHistory");
const Result = require("./Result");

/* =========================
   ASSOCIATIONS
========================= */

// Diamond ↔ Bid
Diamond.hasMany(Bid, { foreignKey: "diamondId" });
Bid.belongsTo(Diamond, { foreignKey: "diamondId" });

// Bid ↔ UserBid
Bid.hasMany(UserBid, { foreignKey: "bidId" });
UserBid.belongsTo(Bid, { foreignKey: "bidId" });

// User ↔ UserBid
User.hasMany(UserBid, { foreignKey: "userId" });
UserBid.belongsTo(User, { foreignKey: "userId" });

// UserBid ↔ BidHistory
UserBid.hasMany(BidHistory, { foreignKey: "userBidId" });
BidHistory.belongsTo(UserBid, { foreignKey: "userBidId" });

// Bid ↔ Result
Bid.hasOne(Result, { foreignKey: "bidId" });
Result.belongsTo(Bid, { foreignKey: "bidId" });

// User ↔ Result (winner)
User.hasMany(Result, { foreignKey: "winnerUserId" });
Result.belongsTo(User, { foreignKey: "winnerUserId" });

module.exports = {
  User,
  Diamond,
  Bid,
  UserBid,
  BidHistory,
  Result,
};
