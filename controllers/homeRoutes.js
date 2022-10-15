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


// router.get('/', async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const blogData = await Blog.findAll({
//       include: [
//         {
//           // just return User.name in the response
//           model: User,
//           attributes: ['name'],
//         },
//         {
//           model: Comment          
//         }
//       ]
//     });

//     const userData = await User.findAll({});

//     // Serialize data so the template(main.hds) can read it
//     const blogs = blogData.map((blog) => blog.get({ plain: true }));   
    
//     const users = userData.map((user) => user.get({ plain: true }));

//     // console.log(blogs[3]);

//   // Pass serialized response(ie array of blogs) and session flag into homepage.hds template
//     res.render('homepage', { 
//       blogs, users,
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// if hit, get all blog records (in an array)
router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment          
        }
      ]
    });

// Serialize data so the html template(project.hds) can read it
    const blog = blogData.get({ plain: true });    

// pass single project response into blog.hdbs template
    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a blog route
router.put('/blog/:id', (req, res) => {
  //Calls the update method 
  Blog.update(
    {
      // All the fields you can update and the data attached to the request body.
      title: req.body.title,
      content: req.body.content    
    },
    {
      // Gets a blog based on the blog_id given in the request parameter
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedBlog) => {
      res.json(updatedBlog);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
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
