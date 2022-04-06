const { faker } = require('@faker-js/faker');

function generateComments() {
  let comments = [];
  for (let i = 0; i < 10; i++) {
    const author = faker.name.firstName() + ' ' + faker.name.lastName();
    const dateCreated = faker.time.recent();
    const detail = faker.lorem.paragraph();

    comments.push({
      author,
      dateCreated,
      detail,
    });
  }

  return comments;
}

module.exports = generateComments();
