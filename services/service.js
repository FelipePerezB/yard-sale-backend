const boom = require('@hapi/boom');
// const pool = require('../libs/postgres');
const {models} = require('../libs/sequelize');
class Service {
  constructor() {
    // this.pool = pool
    // this.pool.on("error", (err)=>console.log(err))
  }
  async create(body) {
    const newElement = await models.User.create(body)
    return {
      message: 'created',
      data: newElement,
    };
  }
  find = async (limit, offset) => {
    // const query = "SELECT * FROM tasks"
    // const rta = await this.pool.query(query)
    const rta = await models.User.findAll()
    return {
      message: 'succesfull',
      data: rta,
    };

    // const client = await getConnection();
    // const rta = await client.query('SELECT * FROM tasks');
    // return {
    //   message: 'succesfull',
    //   data: rta.rows,
    // };
    // const queryData = [...this.data];
    // if (offset) {
    //   queryData.splice(0, offset);
    // }
    // if (limit) {
    //   queryData.splice(limit, this.data.length - limit);
    // }
  };
  findOne = async (id) => {
    const element = await models.User.findByPk(id)
    if (!element) {
      throw boom.notFound('id not found');
    }
    return {
      message: 'succesfull',
      data: element,
    };
  };

  async update(id, body) {
    const element = await models.User.findByPk(id)
    if (!element) {
      throw boom.notFound('id not found');
    }
    const rta = await element.update(body)
    // const index = this.data.findIndex((e) => e.id == id);
    return {
      message: 'updated',
      data: rta,
    };
  }
  async delete(id) {
    // const index = this.data.findIndex((e) => e.id == id);
    const element = await models.User.findByPk(id)
    if (!element) {
      throw boom.notFound('id not found');
    }
    await element.destroy()
    return {
      message: 'deleted',
      data: id,
    };
  }
}

module.exports = Service;
