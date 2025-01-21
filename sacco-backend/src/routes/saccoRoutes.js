const express = require('express');
const { joinSacco, makeDeposit } = require('../controllers/saccoController');

const router = express.Router();

router.post('/join', joinSacco);
router.post('/deposit', makeDeposit);

module.exports = router;