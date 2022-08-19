const express = require('express');
const {
  create,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
} = require('../controllers/postController');
const postRouter = express.Router();
postRouter.post('/new', create);
postRouter.get('/posts', getPosts);
postRouter.get('/post/:id', getPostById);
postRouter.patch('/post', updatePostById);
postRouter.delete('/post/:id', deletePostById);
module.exports = postRouter;
