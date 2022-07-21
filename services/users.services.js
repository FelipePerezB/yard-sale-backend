const faker = require('faker');
const Service = require('./services');

class UsersService extends Service {
  constructor() {
    super();
    this.data = [];
    this.generate(this.data);
  }
  generate(data) {
    const TOTAL_USERS = 20;
    for (let i = 0; i < TOTAL_USERS; i++) {
      const name = faker.name.findName();
      const arrayName = name.split(' ');
      const firstName = arrayName[0];
      const lastName = arrayName[1];
      data.push({
        id: faker.datatype.uuid(),
        email: faker.internet.email(firstName, lastName),
        name: name,
        password: faker.internet.password(),
        role: i % 7 === 0 ? 'admin' : 'customer',
        avatar: faker.image.people(),
      });
    }
  }
}

module.exports = UsersService;
