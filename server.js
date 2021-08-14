//current tracker
const express = require("express");
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require('./controllers');
const helpers = require('./public/js/helpers');
const db = require("./models");

const PORT = process.env.PORT || 3000;
const app = express();

const sess = {
    secret: 'Dpdi345id983ldiEI$50w',
    cookie: {},
    resave: false,
    saveUninitialized: true
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exercisetrackerdb", config);

// //page service
// app.get("/exercise", (req, res) => {
//     res.sendFile(__dirname + "/public/exercise.html")
// });

// app.get("/stats", (req, res) => {
//     res.sendFile(__dirname + "/public/stats.html");
// });

// app.get("/login", (req, res) => {
//     res.sendFile(__dirname + "/public/login.html");
// });



// //db calls
// app.get("/user", (req, res) => {
//     db.User.find({})
//         .then(dbUser => {
//             res.json(dbUser);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.get("/api/workouts", async (req, res) => {
//     db.Workout.aggregate([{$addFields: {totalDuration:{$sum: `$exercises.duration`}}}])
//         .then(dbWorkout => {
//             console.log("workout",dbWorkout);
//             res.json(dbWorkout)
//         })
//         .catch(err => {
//             console.log("error",err);
//             res.status(400).json(err);
//         })
// });

// app.post("/api/workouts", async (req, res) => {
//     console.log("Hit api workouts");

//     try {
//         const workout = await db.Workout.create({});
//         res.json(workout);
//     }
//     catch (err) {
//         res.status(400).json(err);
//     }
// });

// //get this working now, but update later to work with a model
// //separating Workout and Exercise
// app.put("/api/workouts/:id", async (req, res) => {
//     db.Workout.findOneAndUpdate({ _id: req.params.id },{ $push: { exercises: req.body } })
//     .then(updatedWorkout => res.json(updatedWorkout))
//     .catch(err =>  {
//         res.status(400).json(err);
//     });
// });

// app.get("/api/workouts/range",(req,res) => {
//     console.log("Hit api/workouts/range");

//     db.Workout.aggregate([{$addFields: {'totalDuration':{$sum:`$exercises.duration`}}}])
//         .sort({_id:-1}).limit(7)
//         .then(workouts => {
//             console.log("workouts in range",workouts);
//             res.json(workouts);
//         })
//         .catch(err => {
//             console.log('/api/workout/stats',err);
//             res.status(400).json(err);
//         });
// });

// app.get("/user", (req, res) => {
//     db.User.find({})
//         .then(dbUser => {
//             res.json(dbUser);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
