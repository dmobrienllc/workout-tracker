const router = require('express').Router();
const { User, Workout, Exercise } = require('../models');
const withAuth = require('../utils/auth');
const mongoose = require('mongoose');
//const api = require('../../public/js/api');

//REFACTOR THIS
router.get('/', async (req, res) => {
    console.log("Session User ID: ",req.session.user_id);
    try {
        if (req.session.logged_in) {
                const user = await User.findOne({ _id: req.session.user_id }).
                    populate('workouts').lean();

                console.log("User Name: ", user);

                let data = parseWorkoutData(user.username, user.workouts);

                res.render('homepage', {
                    data,
                    logged_in: req.session.logged_in
                })
            }
            else {
                res.render('login')
            }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//this where you do the aggregating to present the workout box
router.get('/homepage', async (req, res) => {
    console.log("Home Routes/homepage");
    try {
        if (req.session.logged_in) {
            const user = await User.findOne({ _id: req.session.user_id }).
                populate('workouts').lean();

            console.log("User Name: ", user);

            let data = parseWorkoutData(user.username, user.workouts);

            console.log("Data: ", data);

            res.render('homepage', {
                data,
                logged_in: req.session.logged_in
            })
        }
        else {
            res.render('login')
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    console.log("In Homeroutes/dashboard");

    try {
        const user = await User.findOne
            ({
                "_id": req.session.user_id
            }).lean();

        res.render('dashboard', {
            user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log("Error in /dashboard");
        res.status(500).json(err);
    }
});

router.get('/workout', withAuth, async (req, res) => {
    console.log("In Homeroutes/workout");

    try {
        const newWorkout = await Workout.create(req.body);

        if (newWorkout) {
            req.session.new_workout_id = newWorkout._id;
        }
        console.log(newWorkout._id);

        const user = await User.findByIdAndUpdate({ _id: req.session.user_id },
            { $push: { "workouts": { _id: newWorkout._id } } });

        res.render('exercise', {
            user,
            logged_in: req.session.logged_in,
            new_workout_id: req.session.new_workout_id
        });
    } catch (err) {
        console.log("Error in /exercise");
        res.status(500).json(err);
    }
});

router.get('/exercise/:id', withAuth, async (req, res) => {
    console.log("In Homeroutes/exercise");

    try {
        const user = await User.findOne
            ({
                "_id": req.session.user_id
            }).lean();

        res.render('dashboard', {
            user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log("Error in /dashboard");
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    console.log("Home Routes/login");
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }
    res.render('login');
});

router.get('/logout', (req, res) => {
    console.log("Home Routes/logout");
    if (req.session.logged_in) {
        req.session.destroy(async () => {

            res.render('homepage', {
                logged_in: false
            });
            return;
        });
    } else {
        res.status(404).end();
    }
});


//Convenience methods; move into external js after 
//testing
const parseWorkoutData = (username, workouts) => {


    let userName,
        hasWorkOuts = false,
        workoutId = "",
        workoutDate,
        resistDuration = 0,
        resistNumExercises = 0,
        resistWeight = 0,
        resistSets = 0,
        resistReps = 0,
        cardioNumExercises = 0,
        cardioDuration = 0,
        cardioDistance = 0;

        userName = username;

    if (workouts.length) {
        let workout = workouts[workouts.length - 1];

        workoutId = workout._id;
        hasWorkOuts = true;
        workoutDate = formatDate(workout.day);

        for (const exercise of workout.exercises) {

            if (exercise.type === "Resistance") {
                resistNumExercises++;
                resistDuration = exercise.duration;
                resistWeight += exercise.weight;
                resistSets += exercise.sets;
                resistReps += exercise.reps;
            } else {
                cardioNumExercises++;
                cardioDuration = exercise.duration;
                cardioDistance += exercise.distance;
            }
        }
    }


    return {
        userName,
        hasWorkOuts,
        workoutId,
        workoutDate,
        resistDuration,
        resistNumExercises,
        resistWeight,
        resistSets,
        resistReps,
        cardioNumExercises,
        cardioDuration,
        cardioDistance
    }
}

const formatDate = (date) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    return new Date(date).toLocaleDateString(options);
}

module.exports = router;
