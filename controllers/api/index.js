const router = require('express').Router();
const userRoutes = require('./userRoutes');
const workoutRoutes = require('./workoutRoutes');

router.use('/users', userRoutes);
router.use('/workouts', userRoutes);

module.exports = router;
