'use strict';
const { DataTypes } = require('sequelize');
const { PRODUCT_TABLE, ProductSchema } = require('./../models/products.model');
const { CATEGORY_TABLE } = require('./../models/category.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(PRODUCT_TABLE, "category_id", ProductSchema.categoryId)
    await queryInterface.changeColumn(PRODUCT_TABLE, 'category_id', {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false,
      references:{
        model: CATEGORY_TABLE,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(PRODUCT_TABLE, "category_id");
  },
};
