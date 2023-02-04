const CategorysService = require('../../../services/categories.service');
// const { checkRoles } = require('../../../utils/checkRoles');

const service = new CategorysService();

const getCategory = async (_, { id }) => {
  return service.findOne(id);
};

const getCategories = () => service.find();

const addCategory = (_, { dto }) => service.create({...dto, image: dto.image.href});

const updateCategory = (_, { id, dto }) => service.update(id, dto);

const deleteCategory = (_, { id }) => service.delete(id);

module.exports = { getCategory, getCategories, addCategory, updateCategory, deleteCategory };
