const router = require('express').Router();

const { create, list, update, remove } = require('../controllers/productController');

router.get('/products', list);
router.post('/product', create);
router.put('/product/:id', update);
router.delete('/product/:id', remove);

module.exports = router;