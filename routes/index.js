const express = require('express');
const router = express.Router();
router.use('/', require('./swagger'));
router.use('/flavors', require('./flavors')); // app.METHOD(PATH/PATTERN, HANDLER) where PATH is a path on the server
router.use('/toppings', require('./toppings'));

module.exports = router;