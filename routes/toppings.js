const express = require('express');
const router = express.Router();
const checkJwt = require('../middleware/authCheck');

const iceCreamShopController = require('../controllers/toppings');

router.get('/', iceCreamShopController.getAllToppings); // HTTP verb, URL path/pattern, function called to handle that pattern
router.get('/:id', iceCreamShopController.getSingleTopping); // /:id = path/pattern  (the req in the getSinlge function)
router.post('/', iceCreamShopController.createTopping);
router.put('/:id', iceCreamShopController.updateTopping);
router.delete('/:id', iceCreamShopController.deleteTopping);

module.exports = router;