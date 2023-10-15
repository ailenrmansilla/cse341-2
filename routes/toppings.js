const express = require('express');
const router = express.Router();

const iceCreamShopController = require('../controllers/toppings');

router.get('/toppings', iceCreamShopController.getAllToppings); // HTTP verb, URL path/pattern, function called to handle that pattern
router.get('/:id', iceCreamShopController.getSingleTopping); // /:id = path/pattern  (the req in the getSinlge function)
router.post('/', iceCreamShopController.createTopping);
router.put('/:id', iceCreamShopController.updateTopping);
router.delete('/:id', iceCreamShopController.deleteTopping);

module.exports = router;