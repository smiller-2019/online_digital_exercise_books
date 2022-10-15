const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Page extends Model {}

Page.init(
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
    content_url: {
      type: DataTypes.STRING,
    },

    exercisebook_id: {
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
    modelName: "page",
  }
);

module.exports = Page;
