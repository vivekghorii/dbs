const {
  Bid,
  UserBid,
  User,
  Diamond,
  Result,
} = require("../models");

// VIEW ALL USER BIDS FOR A DIAMOND
const viewBidsByDiamond = async (req, res) => {
  const { bidId } = req.params;

  const bid = await Bid.findByPk(bidId, {
    include: [
      { model: Diamond },
      {
        model: UserBid,
        include: [{ model: User, attributes: ["id", "name", "email"] }],
      },
    ],
  });

  if (!bid) {
    return res.status(404).json({ message: "Bid not found" });
  }

  // Check if result is declared
  const result = await Result.findOne({ where: { bidId } });
  const isResultDeclared = !!result;

  // Calculate highest bid amount
  let highestBidAmount = null;
  if (bid.UserBids && bid.UserBids.length > 0) {
    highestBidAmount = Math.max(
      ...bid.UserBids.map((ub) => Number(ub.bidAmount))
    ).toString();
  }

  // Format bids array for frontend
  const formattedBids = bid.UserBids.map((ub) => ({
    userId: ub.userId,
    userName: ub.User ? ub.User.name : "Unknown",
    bidAmount: ub.bidAmount.toString(),
  }));

  res.json({
    bidId: bid.id,
    diamondName: bid.Diamond.name,
    bids: formattedBids,
    highestBid: highestBidAmount,
    isResultDeclared,
  });
};

// DECLARE RESULT
const declareResult = async (req, res) => {
  const { bidId } = req.params;

  const bid = await Bid.findByPk(bidId);
  if (!bid) {
    return res.status(404).json({ message: "Bid not found" });
  }

  if (new Date() < new Date(bid.endTime)) {
    return res.status(400).json({
      message: "Cannot declare result before bid end time",
    });
  }

  const existingResult = await Result.findOne({ where: { bidId } });
  if (existingResult) {
    return res.status(400).json({ message: "Result already declared" });
  }

  const userBids = await UserBid.findAll({
    where: { bidId },
    order: [["bidAmount", "DESC"]],
  });

  if (userBids.length === 0) {
    return res.status(400).json({ message: "No bids placed" });
  }

  const winnerBid = userBids[0];

  const result = await Result.create({
    bidId,
    winnerUserId: winnerBid.userId,
    winningAmount: winnerBid.bidAmount,
  });

  // Close bid
  bid.status = "CLOSED";
  await bid.save();

  res.json({
    message: "Result declared successfully",
    result,
  });
};

module.exports = {
  viewBidsByDiamond,
  declareResult,
};
