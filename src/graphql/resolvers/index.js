const { getProduct, getProducts, addProduct, updateProduct, deleteProduct, getProductByCategory } = require('./product.resolver');
const { getUser, getUsers, addUser, updateUser, deleteUser } = require('./user.resolver');
const { getCategory, getCategories, addCategory, updateCategory, deleteCategory } = require('./category.resolver');
const { login } = require('./auth.resolver');

const {RegularExpression} = require('graphql-scalars')
// creamos el type con una nueva instancia de RegularExpression

const CategoryNameType= new RegularExpression('CategoryNameType', /^[a-zA-Z0-9]{3,8}$/);

const resolvers = {
  Query: {
    // Categories
    category: getCategory,
    allCategories: getCategories,

    // Products
    product: getProduct,
    allProducts: getProducts,

    // Users
    user: getUser,
    allUsers: getUsers,
  },
  Mutation: {
    login,

    // Categories
    addCategory,
    updateCategory,
    deleteCategory,

    // Products
    addProduct,
    updateProduct,
    deleteProduct,

    // Users
    addUser,
    updateUser,
    deleteUser,
  },
  CategoryNameType,
  Category: {
    products: getProductByCategory
  }
};
module.exports = { resolvers };
