const sequelize = require('../config/connection');

const User = require('../models/User');
const userData = require('./user-seeds.json');

const Subject = require('../models/Subject');
const subjectData = require('./subject-seeds.json');

const Class = require('../models/Class');
const classData = require('./class-seeds.json');

const ExerciseBook = require('../models/ExerciseBook');
const exerciseBookData = require('./exercise-book-seeds.json');

const Page = require('../models/Page');
const pageData = require('./page-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Subject.bulkCreate(subjectData, {
    individualHooks: true,
    returning: true,
  });

  await Class.bulkCreate(classData, {
    individualHooks: true,
    returning: true,
  });

  await ExerciseBook.bulkCreate(exerciseBookData, {
    individualHooks: true,
    returning: true,
  });

  await Page.bulkCreate(pageData, {
    individualHooks: true,
    returning: true,
  });
  
  process.exit(0);
};

seedDatabase();