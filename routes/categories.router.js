const express = require('express');
const router = express.Router();
const faker = require("faker")

const categories = []
const TOTAL_CATEGORIES = 10
for(let i=0; i<TOTAL_CATEGORIES; i++){
  categories.push({
    id: i+1,
    name: faker.commerce.department(),
    image: faker.image.imageUrl()
  })
}

// CATEGORIES
router.get('/', (req, res) => {
  res.json(categories);
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = categories.find((category) => category.id == id);
  res.json(category);
});

module.exports=router
