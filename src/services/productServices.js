//header files
const faker = require('faker');


// plantilla de servicios para productos
class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    for (let index = 0; index < 100; index++) {
        this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(item => item.id === id);
  }

  update(id, change) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('product not fount');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...change
    };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('product not fount');
    }
    this.products.splice(index, 1);
    return { "message": "deleted", id };
  }
}


//exportar servicios
module.exports = ProductService;