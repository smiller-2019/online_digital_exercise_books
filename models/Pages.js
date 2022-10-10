const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Pages extends Model {}

Pages.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    content: {
      type: DataTypes.STRING,
    },
    content_type: {
      type: DataTypes.STRING,
    },

    exercise_book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "exercise_book",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "pages",
  }
);

module.exports = Pages;
