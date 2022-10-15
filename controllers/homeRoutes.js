const router = require('express').Router();
const { ExerciseBook, Page, User, Subject , Class1} = require('../models');
const withAuth = require('../utils/auth');

// Login route on entry
router.get('/', (req, res) => {
    // If the user is already logged in, redirect to student or teacher view
    if (req.session.logged_in) {
      if (req.session.user_role == "student") {
        res.redirect('/studentdashboard');
      } else if  (req.session.user_role == "teacher") {
        res.redirect('/teacherdashboard');
      }
      return;
    }
  // render login.hdbs if not yet logged in
    res.render('login');
  });


//========================================================================================

// get exercises as per logged_in user_id
router.get('/studentdashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      // include the associated blog records as per user
      const userData = await User.findByPk(req.session.user_id, {        
        attributes: { exclude: ['password'] },
        include: [{ model: ExerciseBook }],
      });
      const user = userData.get({ plain: true });  
      console.log(user);
  
      // pass user details and session flag into studentdashboard view  
      res.render('studentdashboard', {
        user: user,
        logged_in: true,
        ExerciseBook: userData.ExerciseBook
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

// get exercises as per logged_in user_id
router.get('/teacherdashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // include the associated blog records as per user
    const teacherData = await User.findByPk(req.session.user_id, {        
      attributes: { exclude: ['password'] }});
    const user = teacherData.get({ plain: true });
    const classData = await Class1.findAll({
      where: { teacher_email: user.email }
    });
    var exerciseBooks = [];
    for(var i=0; i<classData.length; i++){
      var semail = classData[i].getDataValue('student_email');
      var ebData = await ExerciseBook.findAll({ where: {student_email: semail}});
      ebData.forEach(eb => {
        exerciseBooks.push(eb.get({plain: true}));
      });
    };
    console.log(exerciseBooks);

    // pass user details and session flag into studentdashboard view  
    res.render('teacherdashboard', {
      user: user,
      logged_in: true,
      ExerciseBooks: exerciseBooks
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/newExercise', withAuth, async (req, res) => {
  const userData = await User.findByPk(req.session.user_id, {        
    attributes: { exclude: ['password'] }
  });
  const user = userData.get({ plain: true });

  var subjects = [];
  const subjectData = await Subject.findAll();
  subjectData.forEach(data => {
    subjects.push(data.get({plain: true}));
  });

  res.render('exercise', {
    user: user,
    exerciseId: 0,
    logged_in: req.session.logged_in,
    isStudent: (user.role=='student'),
    subjects: subjects
  });
});

router.get('/exercise/:id', withAuth, async (req, res) => {
  const userData = await User.findByPk(req.session.user_id, {        
    attributes: { exclude: ['password'] }
  });
  const user = userData.get({ plain: true });

  var subjects = [];
  const subjectData = await Subject.findAll();
  subjectData.forEach(data => {
    subjects.push(data.get({plain: true}));
  });

  res.render('exercise', {
    user: user,
    exerciseId: req.params.id,
    logged_in: req.session.logged_in,
    isStudent: (user.role=='student'),
    subjects: subjects
  });
});

// Get the associated blog records as per logged_in user_id
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // include the associated blog records as per user
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });
    console.log(user);

    // pass user details and session flag into profile.hdbs template  
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
