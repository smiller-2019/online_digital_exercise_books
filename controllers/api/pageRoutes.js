const router = require('express').Router();
const { Page } = require('../../models');
const withAuth = require('../../utils/auth');

// post new page
router.post('/', withAuth, async (req, res) => {
  try {
    //create new comment as per req.body from frontend
    const newPage = await Page.create(req.body);
    
 // console.log(req.body.exerciseId_int); parent exercise_ID   

    res.status(200).json(newPage);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a page route(associated with an exercise_id) 
router.put('/:id', (req, res) => {
    //Calls update method 
    Page.update(
      {
        // 3 fields you can update in Page table.
        content: req.body.content,
        content_type: req.body.content_type,
        content_url: req.body.content_url
      },
      {
        // delete a exercise based on exercise_id given in request parameter
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedPage) => {
        res.json(updatedPage);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

module.exports = router;