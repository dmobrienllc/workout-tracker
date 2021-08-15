const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: {
        type: String,
        trim: true,
        required: "Username is Required"
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [({ length }) => length >= 6, "Password should be longer."]
    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    userCreated: {
        type: Date,
        default: Date.now
    },
    workouts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Workout"
        }
    ]
});

UserSchema.pre('save', function(next) {                                                                                                                                        
    if(this.password) {                                                                                                                                                        
        var salt = bcrypt.genSaltSync(10)                                                                                                                                     
        this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
    }                                                                                                                                                                          
    next()                                                                                                                                                                     
  }) 
  
  UserSchema.methods.comparePassword = function(candidatePassword){
    //return bcrypt.compareSync(candidatePassword, this.password);
    return true;
  };

const User = mongoose.model("User", UserSchema);
module.exports = User;









