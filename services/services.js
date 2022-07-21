const faker = require('faker');
const boom = require('@hapi/boom');
class Service {
  constructor() {}
  async create(body) {
    this.data.push({
      id: faker.datatype.uuid(),
      ...body,
    });
    return {
      message: 'created',
      data: this.data[this.data.length - 1],
    };
  }
  find = async (limit, offset) => {
    const queryData = [...this.data];
    if (offset) {
      queryData.splice(0, offset);
    }
    if (limit) {
      queryData.splice(limit, this.data.length - limit);
    }
    return {
      message: 'succesfull',
      data: queryData,
    };
  };
  findOne = async (id) => {
    const queryData = this.data.find((e) => e.id == id);
    if (queryData) {
      return queryData;
    } else {
      throw boom.notFound('id not found');
    }
  };

  async update(id, body) {
    const index = this.data.findIndex((e) => e.id == id);
    if (index !== -1) {
      this.data[index] = {
        ...this.data[index],
        ...body,
      };
      return {
        message: 'updated',
        data: this.data[index],
      };
    } else {
      throw boom.notFound('id not found');
    }
  }
  async delete(id) {
    const index = this.data.findIndex((e) => e.id == id);
    if (index !== -1) {
      this.products.splice(productIndex, 1);
      return {
        message: 'deleted',
        data: id,
      };
    } else {
      throw boom.notFound('id not found');
    }
  }
}

module.exports = Service;
