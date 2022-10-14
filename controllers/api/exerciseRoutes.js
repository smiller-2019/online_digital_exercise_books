const router = require('express').Router();
const { ExerciseBook } = require('../../models');
const withAuth = require('../../utils/auth');

// post new exercise
router.post('/', withAuth, async (req, res) => {
  try {
    // create newExercise using req.body. auto-populate student_email field
    const newExercise = await ExerciseBook.create({
      ...req.body,
      student_email: req.session.user_email,
    });

    res.status(200).json(newExercise);
  } catch (err) {
    res.status(400).json(err);
  }
});

// this route is called by main.js on click
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const exerciseData = await ExerciseBook.destroy({
      where: {
        id: req.params.id,
        student_email: req.session.student_email,
      },
    });

    if (!exerciseData) {
      res.status(404).json({ message: 'No exercise found with this id!' });
      return;
    }

    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update an exercsie route
router.put('/:id', (req, res) => {
    //Calls the update method 
    ExerciseBook.update(
      {
        // 3 fields you can update in exerciseBook table.
        topic: req.body.topic,
        content: req.body.content,
        subject_id: req.body.subject_id    
      },
      {
        // delete a exercise based on exercise_id given in request parameter
        where: {
          exercise_ID: req.params.id,
        },
      }
    )
      .then((updatedExercise) => {
        res.json(updatedExercise);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });


module.exports = router;