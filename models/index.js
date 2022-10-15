const User = require("./User");
const Subject = require("./Subject");
const Class = require("./Class");
const Exercisebook = require("./Exercisebook");
const Page = require("./Page");

User.hasMany(Exercisebook, {
  foreignKey: "student_email",
  onDelete: "CASCADE",
});

Exercisebook.belongsTo(User, {
  foreignKey: "student_email",
});

Subject.hasMany(Exercisebook, {
  foreignKey: "subject_id",
  onDelete: "CASCADE",
});

Exercisebook.belongsTo(Subject, {
  foreignKey: "subject_id",
});

Exercisebook.hasMany(Page, {
  foreignKey: "exercisebook_id",
  onDelete: "CASCADE",
});

Page.belongsTo(Exercisebook, {
  foreignKey: "exercisebook_id",
});

User.hasMany(Class, {
  foreignKey: "teacher_email",
  onDelete: "CASCADE",
});

Class.belongsTo(User, {
  foreignKey: "teacher_email",
});

Class.hasMany(Subject, {
  foreignKey: "subject_id",
  onDelete: "CASCADE",
});

Subject.belongsTo(Class, {
  foreignKey: "subject_id",
});

User.hasMany(Class, {
  foreignKey: "student_email",
  onDelete: "CASCADE",
});

Class.belongsTo(User, {
  foreignKey: "student_email",
});

module.exports = { User, Exercisebook, Class, Subject, Page };
