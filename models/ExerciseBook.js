const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ExerciseBook extends Model {}

ExerciseBook.init(
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
    content: {
      type: DataTypes.STRING,
    },
    feedback: {
      type: DataTypes.STRING,
    },

    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "subject",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "exercise_book",
  }
);

module.exports = ExerciseBook;
