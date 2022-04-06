const { faker } = require('@faker-js/faker');

function generateRecommendations() {
  let recommendations = [];

  for (let i = 0; i < 5; i++) {
    const id = faker.datatype.uuid();
    const title = faker.animal.dog();
    const description = faker.lorem.paragraph();

    recommendations.push({
      id,
      title,
      description,
    });
  }

  return recommendations;
}

module.exports = generateRecommendations();
