const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
require('./passport')(passport);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => {
    app.listen(port);
    console.log(`Server on port ${port}`);
    console.log('Connected to DB');
  })
  .catch((err) => console.log(err));

// Routes
const users = require('./routes/users');
app.use('/users', users);
const blogs = require('./routes/blogs');
app.use('/blogs', blogs);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

app.use(express.static(__dirname + '/public/'));

app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));
