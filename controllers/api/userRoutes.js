const router = require('express').Router();
const { User, Workout } = require('../../models');

router.post('/', async (req, res) => {
    console.log("Hitting create or find user, from login/create user");
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        userData = await User.create(req.body);
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        const user = userData.get({ plain: true });
  
        res.status(200).json(user);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;