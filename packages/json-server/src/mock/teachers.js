const { faker } = require('@faker-js/faker');

function generateTeachers() {
  let teachers = [];

  for (let id = 0; id < 10; id++) {
    const id = faker.datatype.uuid();
    const image = faker.image.avatar();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const rating = faker.datatype.number({ min: 1, max: 5 });
    const career = faker.name.jobType();
    const description = faker.lorem.paragraph();

    teachers.push({
      id,
      image,
      firstName,
      lastName,
      email,
      rating,
      career,
      description,
    });
  }
  return teachers;
}

module.exports = generateTeachers();
