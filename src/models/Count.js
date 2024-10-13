"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Count extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Count.init(
    {
      countOfDay: DataTypes.INTEGER,
      time: DataTypes.DATE,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Count",
      tableName: "Counts",
    }
  );
  return Count;
};
