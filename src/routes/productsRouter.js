//header files and helpers
const express = require('express');
const ProductService = require('../services/productServices');
//middlewares header files
const validatorHandler = require('../../middlewares/validatorHandler');
const { createProductSchema,
  updateProductSchema,
  getProductSchema,
queryProductSchema } = require('../../schemas/productSchema');
//router
const router = express.Router();
//servicios
const service = new ProductService();

//query tipo size
router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
  /*   const { size } = req.query;
    const limit = size || 10; */
    try {
      const products = await service.find(req.query);
      res.json(products);
      console.log("products sent");
    } catch (error) {
      next(error);
    }
});

//get id
/* router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === '999') {
    res.status(404).json({
      message: 'not found'
    });
  } else {
    res.status(200).json({
      id,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
}); */

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(200).json(product);
    console.log('product ' + product.name + ' sent');
    } catch (error) {
    next(error);
    }
  }
);

//POST
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);
//patch
router.patch('/:id',
  validatorHandler(createProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);
//delete
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await service.delete(id);
    res.json(deleteProduct);
  } catch (error) {
    next(error);
  }
});



//exportar modulo
module.exports = router;
