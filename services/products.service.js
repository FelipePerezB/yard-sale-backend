const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class ProductsService {
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset } = query;
    (options.limit = limit), (options.offset = offset);

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }
    const { price } = query;
    if (price) {
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
    return { id };
  }
}

module.exports = ProductsService;
