const router = require('express').Router();
const {Workout} = require('../../models');


router.get('/range'), async(req,res) => {
  console.log("Hit /range with body: ", req.body)

  // db.Workout.aggregate([{$addFields: {'totalDuration':{$sum:`$exercises.duration`}}}])
  //       .sort({_id:-1}).limit(7)
  //       .then(workouts => {
  //           console.log("workouts in range",workouts);
  //           res.json(workouts);
  //       })
  //       .catch(err => {
  //           console.log('/api/workout/stats',err);
  //           res.status(400).json(err);
  //       });

}

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
