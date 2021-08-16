const router = require('express').Router();
const { User, Workout, Exercise } = require('../models');
const withAuth = require('../utils/auth');

//THIS WILL TAKE DAILY WORKOUT DATA IF USER IS LOGGED IN,
//OTHERWISE IT"S A WELCOME SPLASH
router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Duplicated from code above, forgot syntax for wildcarding
//this route so it dupes the / above.
router.get('/homepage', async (req, res) => {
    console.log("Home Routes/homepage");
    try {
 
        const user = await User.findOne({ _id: req.session.user_id }).
                                                        populate('workouts').lean();

        res.render('homepage', {
            user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
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

router.get('/exercise', withAuth, async (req, res) => {
    console.log("In Homeroutes/exercise");

    try {
        const user = await User.findOne
            ({
                "_id": req.session.user_id
            }).lean();

        res.render('exercise', {
            user,
            logged_in: req.session.logged_in
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

// //OLD HOME PAGE, 
// router.get('/', async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ['id', 'user_name'],
//                 },
//             ],
//         });

//         const posts = postData.map((post) => post.get({ plain: true }));

//         res.render('homepage', {
//             posts,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });



// router.get('/posts/:id', withAuth,async (req, res) => {
//     console.log("We're hitting GET post/id in homeRoutes.js");
//     try {
//         const postData = await Post.findByPk(req.params.id, { 
//             include: [{
//               model: Comment,
//               include: [
//                 User
//               ]
//             }
//           ]});

//         const post = postData.get({ plain: true });

//         res.render('post-detail', {
//           post,
//           logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;
