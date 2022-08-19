const database = require('../config/db');
// const jwt = require('jsonwebtoken');
// const cookie = require('cookie-parser');
// const bcrypt = require('bcryptjs');
exports.create = (req, res) => {
  const { title, link, description, name, email } = req.body;

  database.query(
    'SELECT email FROM users WHERE email =?',
    [email],
    async (error, results) => {
      if (error) {
        return res.json({
          message: 'Something went wrong!',
        });
      } else if (results.length == 0) {
        return res.json({
          message: 'Login to create new post!',
        });
      }

      database.query(
        'INSERT INTO posts SET ?',
        {
          title,
          description,
          link,
          name,
          email,
        },
        (error, results) => {
          if (error) {
            res.json({
              message: 'Something went wrong!',
            });
          } else {
            return res.json({
              message: 'Post Created Successfully!',
            });
          }
        }
      );
    }
  );
};

exports.getPosts = (req, res) => {
  database.query('SELECT * FROM posts', (error, results) => {
    if (error) {
      return res.json({
        message: 'Something went wrong!',
      });
    } else {
      res.json(results);
    }
  });
};

exports.getPostById = (req, res) => {
  const { id } = req.params;

  const postId = Number(id);
  database.query(
    'SELECT * FROM posts WHERE id=?',
    [postId],
    (error, results) => {
      if (error) {
        return res.json({
          message: 'Something went wrong!',
        });
      } else {
        res.json(results);
      }
    }
  );
};

exports.updatePostById = (req, res) => {
  const { id, title, description, link } = req.body;

  database.query(
    'UPDATE posts SET title=? ,description=? ,link=?  WHERE id=?',
    [title, description, link, id],
    (error, results) => {
      if (error) {
        return res.json({
          message: 'Something went wrong!',
        });
      } else {
        return res.json({
          message: 'Post Updated Successfully!',
        });
      }
    }
  );
};

exports.deletePostById = (req, res) => {
  const { id } = req.params;

  const postId = Number(id);
  database.query(
    'DELETE  FROM posts WHERE id=?',
    [postId],
    (error, results) => {
      if (error) {
        return res.json({
          message: 'Something went wrong!',
        });
      } else {
        return res.json({
          message: 'Post Deleted Successfully!',
        });
      }
    }
  );
};
