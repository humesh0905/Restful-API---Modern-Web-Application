const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');

router.get('/upload', (req, res) => {
  res.render('upload');
});

router.post('/upload', async (req, res) => {
  try {
    await Student.create(req.body);
    res.redirect('/list');
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/list', async (req, res) => {
    try {
      const students = await Student.find();
      res.render('list', { students });
    } catch (error) {
      res.status(500).send("Error reading students data");
    }
  });

router.get('/query', async (req, res) => {
    try {
      let query = {};
      let queryMade = false;
      if (Object.keys(req.query).length > 0) {
        queryMade = true;
      if (req.query.firstName) {
        query.firstName = { $regex: req.query.firstName, $options: 'i' };
      }
      if (req.query.lastName) {
        query.lastName = { $regex: req.query.lastName, $options: 'i' };
      }
      if (req.query.email) {
        query.email = req.query.email;
      }
      if (req.query.dateOfBirth) {
        query.dateOfBirth = req.query.dateOfBirth;
      }
      if (req.query.joiningYear) {
        query.joiningYear = Number(req.query.joiningYear);
      }
    }

      const students = await Student.find(query);
      res.render('query', { students, queryMade });
    } catch (error) {
      res.status(500).send("Error querying students data");
    }
  });

module.exports = router;
