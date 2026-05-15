const { Bid, Diamond, UserBid, User, Result } = require("../models");

const createBid = async (req, res) => {
  try {
    const {
      diamondId,
      baseBidPrice,
      startTime,
      endTime,
    } = req.body;

    if (!diamondId || !baseBidPrice || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields required" });
    }

    const diamond = await Diamond.findByPk(diamondId);
    if (!diamond) {
      return res.status(404).json({ message: "Diamond not found" });
    }

    const bid = await Bid.create({
      diamondId,
      baseBidPrice,
      startTime,
      endTime,
      status: "DRAFT",
    });

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: "Bid creation failed" });
  }
};

const getBids = async (req, res) => {
  const bids = await Bid.findAll({
    include: [{ model: Diamond }],
    order: [["createdAt", "DESC"]],
  });

  res.json(bids);
};

// GET DASHBOARD BIDS WITH USER BIDS INFO
const getDashboardBids = async (req, res) => {
  try {
    const bids = await Bid.findAll({
      include: [
        { model: Diamond },
        {
          model: UserBid,
          include: [{ model: User, attributes: ["id", "name", "email"] }],
          required: false,
        },
        {
          model: Result,
          required: false,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formattedBids = bids.map((bid) => {
      // Calculate highest bid
      let highestBidAmount = null;
      let highestBidUser = null;
      if (bid.UserBids && bid.UserBids.length > 0) {
        const sortedBids = [...bid.UserBids].sort(
          (a, b) => Number(b.bidAmount) - Number(a.bidAmount)
        );
        highestBidAmount = sortedBids[0].bidAmount.toString();
        highestBidUser = sortedBids[0].User
          ? sortedBids[0].User.name
          : "Unknown";
      }

      // Format user bids
      const userBids = bid.UserBids
        ? bid.UserBids.map((ub) => ({
            userId: ub.userId,
            userName: ub.User ? ub.User.name : "Unknown",
            userEmail: ub.User ? ub.User.email : "",
            bidAmount: ub.bidAmount.toString(),
          }))
        : [];

      return {
        id: bid.id,
        diamondName: bid.Diamond.name,
        baseBidPrice: bid.baseBidPrice.toString(),
        startTime: bid.startTime,
        endTime: bid.endTime,
        status: bid.status,
        totalBids: userBids.length,
        userBids: userBids,
        highestBid: highestBidAmount,
        highestBidUser: highestBidUser,
        isResultDeclared: !!bid.Result,
        winnerUserId: bid.Result ? bid.Result.winnerUserId : null,
        winningAmount: bid.Result ? bid.Result.winningAmount.toString() : null,
      };
    });

    res.json(formattedBids);
  } catch (error) {
    console.error("Error in getDashboardBids:", error);
    res.status(500).json({ message: "Failed to fetch dashboard bids" });
  }
};

const updateBidStatus = async (req, res) => {
  try {
    const { bidId } = req.params;
    const { status } = req.body;

    if (!["DRAFT", "ACTIVE", "CLOSED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const bid = await Bid.findByPk(bidId);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    bid.status = status;
    await bid.save();

    res.json(bid);
  } catch (error) {
    res.status(500).json({ message: "Failed to update bid status" });
  }
};

module.exports = { createBid, getBids, updateBidStatus, getDashboardBids };
