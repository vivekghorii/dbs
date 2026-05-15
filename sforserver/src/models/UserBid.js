const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const UserBid = sequelize.define(
  "UserBid",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    bidId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    bidAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "user_bids",
    timestamps: true,
  }
);

module.exports = UserBid;
