const Service = require('./services');
const faker = require('faker');

class CategoriesService extends Service {
  constructor() {
    super();
    this.data = [];
    this.generate(this.data);
  }
  generate(data) {
    const TOTAL_CATEGORIES = 10;
    for (let i = 0; i < TOTAL_CATEGORIES; i++) {
      data.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
        image: faker.image.imageUrl(),
      });
    }
  }
}

module.exports = CategoriesService;
