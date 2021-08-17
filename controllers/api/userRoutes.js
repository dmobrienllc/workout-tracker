const router = require('express').Router();
const User = require('../../models/User');

// router.get('/', async (req, res) => {
//   const userData = await User.findAll({ include: Post }).catch((err) => {
//     res.json(err);
//   });
//   res.json(userData);
// });

// router.get('/:id', async (req, res) => {
//   const productData = await User.findByPk(req.params.id, { include: { all: true } }).catch((err) => {
//     res.json(err);
//   });
//   res.json(productData);
// });

//Called by 'Sign-up' form on login page
//Returns user if exists
//Creates user if user doesn't exist
router.post('/', async (req, res) => {
  try {

    let userData = await User.findOne 
        ({ 
            "email": req.body.email 
        }).lean();

    if (!userData) {
      userData = await User.create(req.body);
    }

    req.session.save(() => {
      req.session.user_id = userData._id;
      req.session.user_name = userData.user_name;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
      console.log(err);
    res.status(400).json(err);
  }
});

//Called by 'Login' form on login page
router.post('/login', async (req, res) => {
  console.log("Hitting api/users/login");
  try {
    const userData = await User.findOne 
        ({ 
            "email" : req.body.email 
        });
    
    if (!userData) {
      res
        .status(400)
        .json({ message: 'No User Found For This Email.' });
      return;
    }else{
        console.log("We have user data");
    }

    const validPassword = await userData.comparePassword(req.body.password);
    console.log("ValidPassword",validPassword);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Invalid password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData._id;
      req.session.user_name = userData.user_name;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//db calls, should go into /api/blah subsection of routing
//=GET posts?
// router.get("/workouts", async (req, res) => {
//   console.log("Hitting api/user/workouts")
//   // db.Workout.aggregate([{$addFields: {totalDuration:{$sum: `$exercises.duration`}}}])
//   //     .then(dbWorkout => {
//   //         console.log("workout",dbWorkout);
//   //         res.json(dbWorkout)
//   //     })
//   //     .catch(err => {
//   //         console.log("error",err);
//   //         res.status(400).json(err);
//   //     })

//   const aggregatedWorkouts = await User.findOne({ _id: req.session.user_id }).
//                                 populate('workouts').lean().
//                                 aggregate([{$addFields: {totalDuration:{$sum: `$exercises.duration`}}}]);

//   console.log("Aggregated: ",aggregatedWorkouts);
//   res.json(aggregatedWorkouts);
// });

//Create Workot
router.post("/workouts", async (req, res) => {
  console.log("Hit api workouts");

  try {
      const workout = await db.Workout.create({});
      res.json(workout);
  }
  catch (err) {
      res.status(400).json(err);
  }
});

//get this working now, but update later to work with a model
//separating Workout and Exercise
//UPDATE workout
router.put("/workouts/:id", async (req, res) => {
  db.Workout.findOneAndUpdate({ _id: req.params.id },{ $push: { exercises: req.body } })
  .then(updatedWorkout => res.json(updatedWorkout))
  .catch(err =>  {
      res.status(400).json(err);
  });
});

//For loading the charts
router.get("/workouts/range",(req,res) => {
  console.log("Hit api/workouts/range");

  db.Workout.aggregate([{$addFields: {'totalDuration':{$sum:`$exercises.duration`}}}])
      .sort({_id:-1}).limit(7)
      .then(workouts => {
          console.log("workouts in range",workouts);
          res.json(workouts);
      })
      .catch(err => {
          console.log('/api/workout/stats',err);
          res.status(400).json(err);
      });
});

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }

//   res.render("/homepage");
// });

module.exports = router;
