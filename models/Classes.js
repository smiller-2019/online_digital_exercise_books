const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Classes extends Model {}

Classes.init(
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
    teacher_email: {
      type: DataTypes.STRING,
      references: {
        model: "user",
        key: "email",
      },
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
    modelName: "classes",
  }
);

module.exports = Classes;
