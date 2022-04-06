const { faker } = require('@faker-js/faker');

function generateCategories() {
  let categories = [];

  for (let i = 0; i < 5; i++) {
    const id = faker.datatype.uuid();
    const title = faker.animal.dog();
    const description = faker.lorem.paragraph();

    categories.push({
      id,
      title,
      description,
    });
  }

  return categories;
}

module.exports = generateCategories();
