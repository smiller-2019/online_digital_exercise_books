const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Exercisebook extends Model {}

Exercisebook.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    student_email: {
      type: DataTypes.STRING,
      references: {
        model: "user",
        key: "email",
      },
    },
    feedback: {
      type: DataTypes.STRING,
    },
    topic: {
      type: DataTypes.STRING,
    },
    grade: {
      type: DataTypes.STRING,
    },
    subject_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "subject",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "exercisebook",
  }
);

module.exports = Exercisebook;
