var express = require('express');
var router = express.Router();

// REQUIRE YOUR MODEL HERE AT THE TOP
const users = require('../models/users');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const data = await users.find();
    res.render('index', { title: 'The Anime Memory Vault', users: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
