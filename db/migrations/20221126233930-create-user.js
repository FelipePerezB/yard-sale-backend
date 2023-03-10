'use strict';

const { UserSchema, USER_TABLE } = require('./../models/user.model');

module.exports = {
  async up (queryInterface,) {
    /**
     * Add altering commands here.
     *
     * Example:
     *
     */
     await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     */
     await queryInterface.dropTable(USER_TABLE);
  }
};
