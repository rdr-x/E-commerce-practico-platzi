const { User, UserSchema } = require('./userModel');
const { Product, ProductSchema } = require('./productModel');
const { Category, CategorySchema} = require('./categoryModel');
const { Customer, CustomerSchema } = require('./customerModel') 

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Customer.associate(sequelize.models);
}

module.exports = { setupModels };