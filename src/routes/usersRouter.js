//header files and helpers
const express = require('express');
const UserService = require('../services/userServices');
const validatorHandler = require('../../middlewares/validatorHandler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../../schemas/userSchema');
//router
const router = express.Router();
//servicios
const service = new UserService();

router.get('/', async (req, res, next) => {
/*  const users = [];
  const { size } = req.query;
  const limit = size || 10; */
  try {
    const users = await service.find();
    res.json(users);
    console.log("users sent");
  } catch (error) {
    next(error);
  }
});

//recoger params tipo query

/* router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parámetros');
  }
}); */
/* //get id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === '999') {
    res.status(404).json({
      message: 'not found'
    });
  } else {
    res.status(200).json({
      id,
      firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			gender: faker.name.gender(),
    });
  }
}); */
router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
      console.log('user ' + user.name + ' sent');
    } catch (error) {
      next(error);
    }
  }
);


//POST
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

//patch
router.patch('/:id',
  validatorHandler(createUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      res.status(404).json({
      message: error.message
      })
    }
  }
);

//delete
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await service.delete(id);
    res.json(deleteUser);
  } catch (error) {
    next(error);
  }
});

//exportar modulo
module.exports = router;
