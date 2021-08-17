const router = require('express').Router();
const {Workout} = require('../../models');

//Adds new exercise to workout
router.put('/', async (req, res) => {
  try {
    console.log("In api/workouts PUT")
    console.log("PUT",req.body);

    if(req.body.duration !== 0){
      const workOut = await Workout.findByIdAndUpdate({ _id: req.session.new_workout_id },
        {$push: {"exercises": req.body}});


      res.status(200).json(workOut);
    }else
    {
      res.status(200).json(req.body);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
