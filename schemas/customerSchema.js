//header file
const Joi = require('joi');
const { createUserSchema, updateUserSchema} = require('./userSchema')
//validators
const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone =  Joi.string();

const getCustomerSchema = Joi.object({
    id: id.required(),
});

const createCustomerSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    user: createUserSchema
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastname: lastName,
  phone: phone,
  user: updateUserSchema
});


module.exports = {
    createCustomerSchema,
    updateCustomerSchema,
    getCustomerSchema
};
