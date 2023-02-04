const { USER_TABLE } = require('./../models/user.model');
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface) => {
    if(queryInterface.context) {queryInterface = queryInterface.context}
    const hash = await bcrypt.hash('admin123', 10)
    return queryInterface.bulkInsert(USER_TABLE, [{
      email: 'admin@mail.com',
      password: hash,
      role: 'admin',
      create_at: new Date()
    }]);
  },
  down: (queryInterface) => {
    if(queryInterface.context) {queryInterface = queryInterface.context}
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
