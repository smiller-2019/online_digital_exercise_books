const User = require("./User");
const ExerciseBook = require("./ExerciseBook");
const Classes = require("./Classes");
const Subject = require("./Subject");

User.hasMany(ExerciseBook, {
  foreignKey: "student_email",
  onDelete: "CASCADE",
});

ExerciseBook.belongsTo(User, {
  foreignKey: "student_email",
});

ExerciseBook.hasMany(Pages, {
  foreignKey: "exercise_book_id",
  onDelete: "CASCADE",
});

Pages.belongsTo(Exercise_book, {
  foreignKey: "exercise_book_id",
});

Subject.hasMany(ExerciseBook, {
  foreignKey: "subject_id",
  onDelete: "SET NULL",
});

ExerciseBook.belongsTo(Subject, {
  foreignKey: "subject_id",
});

Subject.hasMany(Classes, {
  foreignKey: "subject_id",
  onDelete: "CASCADE",
});

Classes.belongsTo(Subject, {
  foreignKey: "subject_id",
});

User.hasMany(Classes, {
  foreignKey: "student_email",
  onDelete: "CASCADE",
});

Classes.belongsTo(User, {
  foreignKey: "student_email",
});

User.hasMany(Classes, {
  foreignKey: "teacher_email",
  onDelete: "CASCADE",
});

Classes.belongsTo(User, {
  foreignKey: "teacher_email",
});

module.exports = { User, Exercise, Classes, Subject };
