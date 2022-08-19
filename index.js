const express = require('express');
const cors = require('cors');
const userRouter = require('./app/routes/userRouter');
const postRouter = require('./app/routes/postRouter');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: 'http://localhost:3000',
};

const database = require('./app/config/db');
//middleware
app.use(cors());

//instead of bodyparser convert the respose to json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to blogger application.' });
});

//routes
app.use(userRouter);
app.use(postRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
