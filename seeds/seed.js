const sequelize = require("../config/connection");
const { User, Subject, Exercisebook, Page, Class } = require("../models");

const userData = require("./userData.json");
const subjectData = require("./subjectData.json");
const classData = require("./classData.json");
const exercisebookData = require("./exercisebookData.json");
const pageData = require("./pageData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const subject of subjectData) {
    await Subject.create({
      ...subject,
    });
  }

  for (const exercisebook of exercisebookData) {
    await Exercisebook.create({
      ...exercisebook,
    });
  }

  for (const page of pageData) {
    await Page.create({
      ...page,
    });
  }

  for (const classes of classData) {
    await Class.create({
      ...classes,
    });
  }

  process.exit(0);
};

seedDatabase();
