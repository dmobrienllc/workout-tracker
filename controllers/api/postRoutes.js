const router = require('express').Router();

// const { Post, Comment, PostComment, UserComment, User } = require('../../models');

// router.get('/', async (req, res) => {
//   try {

//     const postData = await Post.findAll({
//       include: [
//         {
//           model: Comment,
//           include: [
//             User
//           ]
//         }
//       ]
//     });
//     res.json(postData);
//   }
//   catch (err) {
//     res.json(err);
//   }
// });

// router.get('/:id', async (req, res) => {
//   console.log("We're hitting GET post/id in postRoutes.js");
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: Comment,
//           include: [
//             User
//           ]
//         }
//       ]
//     });
//     console.log(postData);

//     res.json(postData);
//   }
//   catch (err) {
//     res.json(err);
//   }
// });

// router.post('/', async (req, res) => {
//   console.log("In postRoutes.js, Post.create");
//   try {
//     const newPost = await Post.create(req.body);

//     res.status(200).json(newPost);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     const post = await Post.update(req.body, {
//       where: {
//         id: req.params.id,
//       }
//     })
//     res.json({ post });
//   }
//   catch (err) {
//     res.status(400).json(err);
//   };
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const postData = await Post.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!postData) {
//       res.status(404).json({ message: 'No post found with this id!' });
//       return;
//     }

//     res.status(200).json(postData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
