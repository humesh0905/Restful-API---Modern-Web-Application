const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');


const app = express();
const port = 9050;

app.use(express.static('public'));

// Here it is connected to MongoDB
mongoose.connect('mongodb://localhost:27017/studentfinder', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/', studentRoutes);

app.get('/', (req, res) => {
    res.redirect('/upload');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});