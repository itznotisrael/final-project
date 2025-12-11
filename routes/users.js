var express = require('express');
var router = express.Router();

// Require your Mongoose model
const users = require('../models/users');

// GET all users (main route)
router.get('/', async function (req, res) {
  try {
    const data = await users.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
});

// GET /all (duplicate of '/', but corrected)
router.get('/all', async function (req, res) {
  try {
    const data = await users.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
});

// GET one user by ID
router.get('/:id', async function (req, res) {
  const id = req.params.id;

  try {
    const data = await users.findById(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
});

// POST - Add new user
router.post('/', async function (request, response) {
  console.log(request.body);

  try {
    const newFields = {
      ...request.body,
      createdAt: new Date(),
      value: 0.25, // remove if your users model doesn't use this
    };

    const newUser = await users.create(newFields);
    response.json(newUser);
  } catch (error) {
    console.log(error);
    response.status(500).send('Something went wrong');
  }
});

// PUT - Update user by ID
router.put('/:id', async function (request, response) {
  console.log(request.params.id);
  console.log(request.body);

  try {
    const updatedUser = await users.findByIdAndUpdate(
      request.params.id,
      { ...request.body },
      { new: true } // return updated document
    );

    response.json(updatedUser);
  } catch (error) {
    console.log(error);
    response.status(500).send('Something went wrong');
  }
});

// DELETE - Delete user by ID
router.delete('/:id', async function (request, response) {
  try {
    const deletedUser = await users.findByIdAndDelete(request.params.id);
    response.json(deletedUser);
  } catch (error) {
    console.log(error);
    response.status(500).send('Something went wrong');
  }
});

module.exports = router;