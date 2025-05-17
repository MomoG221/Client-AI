const express = require('express');
const router = express.Router();
const { handleJoinRequest } = require('../controllers/joinController');

router.post('/', handleJoinRequest);

module.exports = router;
