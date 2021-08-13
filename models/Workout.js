const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        required: true,
        default: Date.now
    },
    exercises: [
    //     {
    //     name: {
    //         type: String,
    //         required: true
    //       },
    //       type: {
    //         type: String,
    //         required: true
    //       },
    //       duration: {
    //         type: Number
    //       },
    //       weight: {
    //         type: Number
    //       },
    //       reps: {
    //         type: Number
    //       },
    //       sets: {
    //         type: Number
    //       },
    //       duration: {
    //         type: Number
    //       },
    //       distance: {
    //         type: Number
    //       }
    // }
        
        // {
        //     type: Schema.Types.ObjectId,
        //     ref: "Exercise"
        // }
    ]
});

const Workout = mongoose.model("Workout",WorkoutSchema);

module.exports = Workout;