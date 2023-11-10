const express = require('express');
const authCheck = require('../middleware/authCheck'); // Correct import

const router = express.Router();

const iceCreamShopController = require('../controllers/flavors');

router.get('/', authCheck, iceCreamShopController.getAllFlavors); // HTTP verb, URL path/pattern, function called to handle that pattern
router.get('/:id', iceCreamShopController.getSingleFlavor); // /:id = path/pattern  (the req in the getSinlge function)
router.post('/', iceCreamShopController.createFlavor);
router.put('/:id', iceCreamShopController.updateFlavor);
router.delete('/:id', iceCreamShopController.deleteFlavor);

module.exports = router;
