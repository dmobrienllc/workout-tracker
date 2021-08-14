const mongoose = require('mongoose');
const db = require('../models');

const config = { useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false }

mongoose.connect("mongodb://localhost/exercisetrackerdb",config);

const userSeed = [


]

const workoutSeed = [
  {
    day: new Date(new Date().setDate(new Date().getDate() - 9)),
    exercises: [
      {
        type: 'Resistance',
        name: 'Bicep Curl',
        duration: 20,
        weight: 100,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 8)),
    exercises: [
      {
        type: 'Cardio',
        name: 'Cycling',
        duration: 90,
        distance: 8,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 7)),
    exercises: [
      {
        type: 'Resistance',
        name: 'Dips',
        duration: 25,
        weight: 185,
        reps: 30,
        sets: 4,
      },
      {
        type: 'Resistance',
        name: 'Pushups',
        duration: 25,
        weight: 185,
        reps: 30,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 6)),
    exercises: [
      {
        type: 'Cardio',
        name: 'Cycling',
        duration: 120,
        distance: 40,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 5)),
    exercises: [
      {
        type: 'Resistance',
        name: 'Bench Press',
        duration: 20,
        weight: 285,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 4)),
    exercises: [
      {
        type: 'Resistance',
        name: 'Squats',
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 3)),
    exercises: [
      {
        type: 'Cardio',
        name: 'Cycling',
        duration: 180,
        distance: 60,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 2)),
    exercises: [
      {
        type: 'Resistance',
        name: 'Bench Press',
        duration: 20,
        weight: 285,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date(new Date().setDate(new Date().getDate() - 1)),
    exercises: [
      {
        type: 'Intense Cardio',
        name: 'Cycling',
        duration: 90,
        distance: 8,
      },
    ],
  },
];

// const seedUser

const seedWorkouts = () => {
  db.Workout.deleteMany({})
  .then(() => db.Workout.collection.insertMany(workoutSeed))
  .then((data) => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
}


