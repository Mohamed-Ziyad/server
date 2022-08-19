const database = require('../config/db');
// const jwt = require('jsonwebtoken');
// const cookie = require('cookie-parser');
const bcrypt = require('bcryptjs');
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  database.query(
    'SELECT email FROM users WHERE email =?',
    [email],
    async (error, results) => {
      if (error) {
        return res.json({
          message: 'Something went wrong!',
        });
      } else if (results.length > 0) {
        return res.json({
          message: 'Email Already taken!',
        });
      }
      let hashPassword = await bcrypt.hash(password, 4);
      database.query(
        'INSERT INTO users SET ?',
        {
          name: name,
          email: email,
          password: hashPassword,
        },
        (error, results) => {
          if (error) {
            res.json({
              message: 'Something went wrong!',
            });
          } else {
            return res.json({
              message: 'User Added Successfully!',
            });
          }
        }
      );
    }
  );
};

exports.login = async (req, res) => {
  // try {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      message: 'Something went wrong!',
    });
  }

  database.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (error, results) => {
      if (error) {
        return res.json({
          message: 'Something went wrong!',
        });
      } else if (
        !results ||
        !(await bcrypt.compare(password, results[0].password))
      ) {
        return res.json({
          message: 'Email or Password is incorrect',
        });
      } else {
        //const id = results[0].id;

        // const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        // expiresIn: process.env.JWT_EXPIRES_IN,
        //  });

        // console.log('the token is ' + token);

        //const cookieOptions = {
        //  expires: new Date(
        // Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        //  ),
        // httpOnly: true,
        // };
        // res.cookie('userSave', token, cookieOptions);
        return res.json(results);
      }
    }
  );
  // } catch (error) {
  //   res.json({
  //     message: 'Error',
  //   });
  // }
};
//straight away exporting register function
