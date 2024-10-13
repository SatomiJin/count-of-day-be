"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Note.init(
    {
      email: DataTypes.STRING,
      messageNote: DataTypes.STRING,
      timeCreate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Note",
      tableName: "Notes",
    }
  );
  return Note;
};
