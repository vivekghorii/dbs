const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Diamond = sequelize.define(
  "Diamond",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    baseDiamondPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "diamonds",
    timestamps: true,
  }
);

module.exports = Diamond;
