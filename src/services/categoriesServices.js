//header files
const faker = require('faker');


// plantilla de servicios para productos
class CategoryService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    for (let index = 0; index < 100; index++) {
        this.categories.push({
          id: faker.datatype.uuid(),
        name: faker.lorem.word(),
      });
    }
  }

  create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategory);
    return newCategory;
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find(item => item.id === id);
  }

  update(id, change) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...change
    };
    return this.categories[index];
  }

  delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('product not fount');
    }
    this.categories.splice(index, 1);
    return { "message": "deleted", id };
  }
}


//exportar servicios
module.exports = CategoryService;