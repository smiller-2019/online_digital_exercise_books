const router = require('express').Router();
const { ExerciseBook, Page } = require('../../models');
const withAuth = require('../../utils/auth');

// get exercise data from the 
router.get('/:id', withAuth, async (req, res) => {
  console.log();
  try {
    // Find the logged in user based on the session ID
    // include the associated blog records as per user
    const exerciseData = await ExerciseBook.findByPk(req.params.id, {        
      include: [{ model: Page, order: [["id"]]}],
    });
    const exercise = exerciseData.get({ plain: true });  
    console.log(exercise);
    res.status(200).json(exercise);
  } catch (err) {
    res.status(400).json(err);
  }
});



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
    console.log(req.body.noteblocks);
    //Calls the update method 
    ExerciseBook.update(
      {
        //2 fields you can update in exerciseBook table.
        topic: req.body.topic,
        subject_id: req.body.subject
      },
      {
        // delete a exercise based on exercise_id given in request parameter
        where: {
          id: req.params.id,
        },
      }
    )
    .then(async(updatedExercise) => {
      const exerciseId = req.params.id;
      var pageDeleted = await Page.destroy(
        {
          where: {
            exercisebook_id: exerciseId
          },
        }
      );

      for(var i=0; i<req.body.noteblocks.length; i++){
        var noteblock = req.body.noteblocks[i];
        switch(noteblock.type){
          case 'text':
            await Page.create({
              "exercisebook_id": exerciseId,
              "content": noteblock.content,
              "content_type": "t"
            });
            break;
          case 'image':
            await Page.create({
              "exercisebook_id": exerciseId,
              "content": noteblock.image,
              "content_type": "i"
            });
            break;
        }
      }

      console.log("Update exercise: "+req.params.id);
      res.status(200).json(updatedExercise);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });


module.exports = router;