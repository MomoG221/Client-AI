const express = require('express');
const router = express.Router();
const { handleNewLead } = require('../controllers/leadController');

router.post('/', handleNewLead);

module.exports = router;
