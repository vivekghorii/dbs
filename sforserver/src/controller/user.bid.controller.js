const { Bid, UserBid, BidHistory, Diamond, Result } = require("../models");
const { Op } = require("sequelize");

// GET ACTIVE BIDS (USER)
const getActiveBids = async (req, res) => {
  const userId = req.user.id;
  const now = new Date();

  const bids = await Bid.findAll({
    where: {
      status: "ACTIVE",
      startTime: { [Op.lte]: now },
      endTime: { [Op.gte]: now },
    },
    include: [
      { model: Diamond },
      {
        model: UserBid,
        where: { userId },
        required: false,
      },
    ],
  });

  const formattedBids = bids.map((bid) => {
    const userBid = bid.UserBids && bid.UserBids.length > 0 ? bid.UserBids[0] : null;
    return {
      id: bid.id,
      baseBidPrice: bid.baseBidPrice.toString(),
      startTime: bid.startTime,
      endTime: bid.endTime,
      Diamond: bid.Diamond,
      currentBidAmount: userBid ? userBid.bidAmount.toString() : null,
    };
  });

  res.json(formattedBids);
};

// PLACE OR EDIT BID
const placeOrEditBid = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bidId, amount } = req.body;

    if (!bidId || amount === undefined || amount === null) {
      return res.status(400).json({ message: "Bid ID and amount are required" });
    }

    const bidAmount = Number(amount);
    if (isNaN(bidAmount) || bidAmount <= 0) {
      return res.status(400).json({ message: "Bid amount must be a valid positive number" });
    }

    const bid = await Bid.findByPk(bidId);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    if (bid.status !== "ACTIVE") {
      return res.status(400).json({ message: `Bid is not active. Current status: ${bid.status}` });
    }

    const now = new Date();
    const endTime = new Date(bid.endTime);
    if (now > endTime) {
      return res.status(400).json({ message: "Bidding time has ended" });
    }

    const basePrice = Number(bid.baseBidPrice);
    if (bidAmount < basePrice) {
      return res.status(400).json({
        message: `Bid amount must be at least $${basePrice.toFixed(2)} (base bid price)`,
      });
    }

    let userBid = await UserBid.findOne({
      where: {
        userId,
        bidId,
      },
    });

    // FIRST BID
    if (!userBid) {
      userBid = await UserBid.create({
        userId,
        bidId,
        bidAmount: bidAmount,
      });
    } else {
      // EDIT BID
      userBid.bidAmount = bidAmount;
      await userBid.save();
    }

    // LOG HISTORY (ALWAYS)
    await BidHistory.create({
      userBidId: userBid.id,
      bidAmount: bidAmount,
    });

    res.json({
      message: "Bid submitted successfully",
      bidAmount: bidAmount,
    });
  } catch (error) {
    console.error("Error in placeOrEditBid:", error);
    res.status(500).json({ message: "Internal server error. Please try again." });
  }
};

// GET BID HISTORY (USER)
const getMyBidHistory = async (req, res) => {
  const userId = req.user.id;
  const { bidId } = req.params;

  const userBid = await UserBid.findOne({
    where: { userId, bidId },
  });

  if (!userBid) {
    return res.status(404).json({ message: "No bid found" });
  }

  const history = await BidHistory.findAll({
    where: { userBidId: userBid.id },
    order: [["editedAt", "ASC"]],
  });

  res.json(history);
};

// GET MY BID RESULTS (WIN/LOSE STATUS)
const getMyBidResults = async (req, res) => {
  const userId = req.user.id;

  const userBids = await UserBid.findAll({
    where: { userId },
    include: [
      {
        model: Bid,
        include: [
          { model: Diamond },
          {
            model: Result,
            required: false,
          },
        ],
      },
    ],
  });

  const results = userBids.map((userBid) => {
    const bid = userBid.Bid;
    const result = bid.Result;
    const isWinner = result && result.winnerUserId === userId;
    const status = result
      ? isWinner
        ? "WON"
        : "LOST"
      : bid.status === "CLOSED"
      ? "PENDING_RESULT"
      : bid.status === "ACTIVE"
      ? "ACTIVE"
      : "DRAFT";

    return {
      bidId: bid.id,
      diamondName: bid.Diamond.name,
      myBidAmount: userBid.bidAmount.toString(),
      baseBidPrice: bid.baseBidPrice.toString(),
      endTime: bid.endTime,
      status,
      isWinner,
      winningAmount: result ? result.winningAmount.toString() : null,
    };
  });

  res.json(results);
};

module.exports = {
  getActiveBids,
  placeOrEditBid,
  getMyBidHistory,
  getMyBidResults,
};
