const User = require("./User");
const ExerciseBook = require("./ExerciseBook");
const Class1 = require("./Class");
const Subject = require("./Subject");
const Page = require("./Page");

User.hasMany(ExerciseBook, {
  foreignKey: "student_email",
  onDelete: "CASCADE",
});

ExerciseBook.belongsTo(User, {
  foreignKey: "student_email"
});

ExerciseBook.hasMany(Page, {
  foreignKey: "exercise_book_id",
  onDelete: "CASCADE",
});

Page.belongsTo(ExerciseBook, {
  foreignKey: "exercise_book_id",
});

Subject.hasMany(ExerciseBook, {
  foreignKey: "subject_id",
  onDelete: "SET NULL",
});

ExerciseBook.belongsTo(Subject, {
  foreignKey: "subject_id",
});

Subject.hasMany(Class1, {
  foreignKey: "subject_id",
  onDelete: "CASCADE",
});

Class1.belongsTo(Subject, {
  foreignKey: "subject_id",
});

User.hasMany(Class1, {
  foreignKey: "student_email",
  onDelete: "CASCADE",
});

Class1.belongsTo(User, {
  foreignKey: "student_email",
});

User.hasMany(Class1, {
  foreignKey: "teacher_email",
  onDelete: "CASCADE",
});

Class1.belongsTo(User, {
  foreignKey: "teacher_email",
});

module.exports = { User, ExerciseBook, Class1, Subject, Page };