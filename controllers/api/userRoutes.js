const router = require('express').Router();
const { User } = require('../../models');

//user Signup route: /api/users/
router.post('/', async (req, res) => {
  console.log('post request route received');
  console.log(req.body);

  try {
    const userData = await User.create(req.body);
    console.log(userData);

    req.session.save(() => {
      req.session.user_id = userData.email;
      req.session.user_email = userData.email;
      req.session.user_role = userData.role;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({"message":err.errors.ValidationErrorItem.message});
  }
});

// user login route: /api/users/login
router.post('/login', async (req, res) => {
  try {
    console.log('login: '+ req.body.email + ' '+ req.body.password);
    // where email from DB = email from payload
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
 // compare DB password for that user with password from input form, get boolean
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // set user_id of the current session = id of the logged in user
    req.session.save(() => {
      req.session.user_id = userData.email;
      req.session.user_email = userData.email;
      req.session.user_role = userData.role;

      req.session.logged_in = true;
      // return logged_in user to frontend
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// user logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
