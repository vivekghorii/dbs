const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const BidHistory = sequelize.define(
  "BidHistory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userBidId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    bidAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    editedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "bid_history",
    timestamps: false,
  }
);

module.exports = BidHistory;
