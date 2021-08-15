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

router.post('/', async (req, res) => {
  console.log("Hitting create user");
  try {

    let userData = await User.findOne 
        ({ 
            "email": req.body.email 
        }).lean();

    if (!userData) {
      userData = await User.create(req.body);
    }

    req.session.save(() => {
        console.log("Hitting save session");
      req.session.user_id = userData._id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
      console.log(err);
    res.status(400).json(err);
  }
});

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
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
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
