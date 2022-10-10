const User = require("./User");
const ExerciseBook = require("./ExerciseBook");
const Classes = require("./Classes");
const Subject = require("./Subject");

User.hasMany(ExerciseBook, {
  foreignKey: "user_id",
  foreignKey: "student_email",
  onDelete: "CASCADE",
});

ExerciseBook.belongsTo(User, {
  foreignKey: "user_id",
});

ExerciseBook.belongsTo(Subject, {
  foreignKey: "subject_id",
});

module.exports = { User, Exercise, Class, Subject };
