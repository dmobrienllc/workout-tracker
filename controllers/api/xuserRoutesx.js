const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/', async (req, res) => {
  const userData = await User.findAll({ include: Post }).catch((err) => {
    res.json(err);
  });
  res.json(userData);
});

router.get('/:id', async (req, res) => {
  const productData = await User.findByPk(req.params.id, { include: { all: true } }).catch((err) => {
    res.json(err);
  });
  res.json(productData);
});

router.post('/', async (req, res) => {
  console.log("Hitting create user");
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

router.post('/login', async (req, res) => {
  console.log("Hitting api/users/login");
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      },
      include: {
        all: true
      }
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const user = userData.get({ plain: true });

    console.log(user);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(user);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }

  res.render("/homepage");
});

module.exports = router;
