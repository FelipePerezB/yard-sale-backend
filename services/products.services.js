const Service = require('./services');
const faker = require('faker');

class ProductsService extends Service {
  constructor() {
    super();
    this.data = [];
    this.generate(this.data);
  }
  async generate(data) {
    const TOTAL_PRODUCTS = 20;
    for (let i = 0; i < TOTAL_PRODUCTS; i++) {
      const category = faker.datatype.number({
        min: 1,
        max: 11,
      });
      data.push({
        id: faker.datatype.uuid(),
        category_id: category,
        name: faker.commerce.productName(),
        price: faker.commerce.price(5, 200, 0),
        image: faker.image.imageUrl(),
      });
    }
  }
}

module.exports = ProductsService;
