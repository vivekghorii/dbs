const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Bid = sequelize.define(
  "Bid",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    diamondId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    baseBidPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("DRAFT", "ACTIVE", "CLOSED"),
      defaultValue: "DRAFT",
    },
  },
  {
    tableName: "bids",
    timestamps: true,
  }
);

module.exports = Bid;
