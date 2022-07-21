const faker = require("faker");
const boom = require("@hapi/boom")

class ProductsService {
  constructor(){
    this.products=[]
    this.generate()
  }
  async generate(){
    const TOTAL_PRODUCTS = 20
    for(let i=0; i<TOTAL_PRODUCTS; i++){
      const category = faker.datatype.number({
        'min': 1,
        'max': 11
      });
      this.products.push({
        id: faker.datatype.uuid(),
        category_id: category,
        name: faker.commerce.productName(),
        price: faker.commerce.price(5,200, 0),
        image: faker.image.imageUrl()
      })
    }
  }
  async create(body){
    this.products.push({
      id:faker.datatype.uuid(),
      ...body,
    })
    return {
      message: 'created',
      data: body,
    }
  }
  find = async (limit, offset) => {
    const queryProducts = [...this.products]
    if(offset){
      queryProducts.splice(0, offset)
    }
    if(limit){
      queryProducts.splice(limit, this.products.length-limit)
    } 
    return queryProducts;
  }
  findOne = async (id) => {
    const product = this.products.find((product) => product.id == id);
    if(product){
      return product
    } else{
      throw boom.notFound("product not found")
    }
  }

  async update(id, body){
    const productIndex = this.products.findIndex((product) => product.id == id)
    console.log(this.products[productIndex])
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...body,
    }
    return {
      message: 'updated',
      data: this.products[productIndex],
    }
  }
  async delete(id){
    const productIndex = this.products.findIndex((product) => product.id == id)
    this.products.splice(productIndex, 1)
    return {
      message: 'deleted',
      data: id, 
    }   
  }
}

module.exports = ProductsService