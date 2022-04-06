const { faker } = require('@faker-js/faker');

function generateAdmins() {
  let admins = [];

  for (let id = 0; id < 10; id++) {
    const id = faker.datatype.uuid();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const image = faker.image.avatar();
    const googleId = faker.datatype.uuid();

    admins.push({
      id,
      firstName,
      lastName,
      email,
      image,
      googleId,
    });
  }

  return admins;
}

module.exports = generateAdmins();
