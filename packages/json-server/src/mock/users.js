const { faker } = require('@faker-js/faker');

function generateUsers() {
  let users = [];

  for (let i = 0; i < 10; i++) {
    const id = faker.datatype.uuid();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const image = faker.image.avatar();
    const lineId = faker.datatype.uuid();
    const facebookId = faker.datatype.uuid();
    const googleId = faker.datatype.uuid();

    users.push({
      id,
      firstName,
      lastName,
      email,
      image,
      lineId,
      facebookId,
      googleId,
    });
  }

  return users;
}

module.exports = generateUsers();
