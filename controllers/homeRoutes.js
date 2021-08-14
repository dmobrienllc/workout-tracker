const router = require('express').Router();
const { User, Workout, Exercise } = require('../models');
const withAuth = require('../public/js/auth');

router.get('/', async (req, res) => {
    console.log("Hitting root redirect to dashboard or login")
    try {
        if (req.session.logged_in) {
            console.log("Hitting root redirect to dashboard or login")
            res.redirect('/dashboard');
            return;
        }

        console.log("Render login")
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard/:id', withAuth,async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, { 
            include: [
                {
                    model: Workout,
                    attributes: ['id', 'user_name'],
                },
            ],
        });

        const user = userData.map((user) => user.get({ plain: true }));

        res.render('dashboard', {
            user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(async () => {
            // const postData = await Post.findAll({
            //     include: [
            //         {
            //             model: User,
            //             attributes: ['id', 'user_name'],
            //         },
            //     ],
            // });

            // const posts = postData.map((post) => post.get({ plain: true }));

            // res.render('homepage', {
            //     posts,
            //     logged_in: false
            // });
            return;
        });
    } else {
        res.status(404).end();
    }
});

//Duplicated from code above, forgot syntax for wildcarding
//this route so it dupes the / above.
// router.get('/homepage', async (req, res) => {
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

// // Use withAuth middleware to prevent access to route
// router.get('/dashboard', withAuth, async (req, res) => {
//     try {
//         const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ['password'] },
//             include: {all:true},
//         });

//         const user = userData.get({ plain: true });

//         res.render('dashboard', {
//             user,
//             logged_in: true
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.get('/login', (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect('/homepage');
//         return;
//     }

//     res.render('login');
// });



module.exports = router;
