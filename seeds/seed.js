const sequelize = require("../config/connection");
const { User, Project } = require("../models");

const userData = require("./userData.json");
const exerciseBookData = require("./exerciseBookData.json");
const classesData = require("./classData.json");
const subjectData = require("./subjectData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const subject = await User.bulkCreate(subjectData, {
    individualHooks: true,
    returning: true,
  });

  for (const exercise_book of exerciseBookData) {
    await ExerciseBook.create({
      ...exercise_book,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      subject_id: subject[Math.floor(Math.random() * subject.length)].id,
    });
  }

  for (const classes of classesData) {
    await Classes.create({
      ...classes,
    });
  }

  process.exit(0);
};

seedDatabase();
