const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Result = sequelize.define(
  "Result",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    bidId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },

    winnerUserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    winningAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "results",
    timestamps: true,
  }
);

module.exports = Result;
