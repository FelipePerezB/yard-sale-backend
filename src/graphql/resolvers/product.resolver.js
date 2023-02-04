const ProductsService = require('../../../services/products.service');

const service = new ProductsService();

const getProduct = (_, { id }) =>  service.findOne(id);

const getProducts = () =>  service.find();

const addProduct = (_, { dto }) =>  service.create(dto);

const updateProduct = (_, { id, dto }) =>  service.update(id, dto);

const deleteProduct = (_, { id }) =>  service.delete(id);

const getProductByCategory = (parent) => {
  console.log(parent);
  const id = parent.dataValues.id
  return service.getByCategory(id)
}

module.exports = { getProduct, getProducts, addProduct, updateProduct, deleteProduct, getProductByCategory };
