const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class ProductsService {
  async getByCategory(id) {
    return await models.Product.findAll({ whre: { categoryId: id } });
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    options.limit = query?.limit;
    options.offset = query?.offset;

    if (query?.price_min && query?.price_max) {
      const { price_min, price_max } = query;
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    if (query?.price) {
      const { price } = query;
      options.where.price = price;
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const rta = await models.Product.findByPk(id);
    if (!rta) {
      throw boom.notFound('product not found');
    }
    return rta;
  }

  async update(id, body) {
    const item = await this.findOne(id);
    const rta = await item.update(body);
    return rta;
  }

  async delete(id) {
    const rta = await this.findOne(id);
    await rta.destroy();
    return true;
  }
}

module.exports = ProductsService;
