const { faker } = require('@faker-js/faker');
const generateComments = require('./comments');
const generateContentSections = require('./content-section');
const generateCategories = require('./categories');

function generateCourses() {
  let courses = [];
  for (let i = 0; i < 30; i++) {
    const id = faker.datatype.uuid();
    const title = faker.animal.dog();
    const description = faker.lorem.paragraph();
    const picture = faker.image.abstract();
    const detail = faker.lorem.paragraph(80);
    const hoursToFinished = faker.datatype.number({
      min: 1,
      max: 128,
    });
    const price = faker.datatype.number({
      min: 100,
      max: 5000,
    });
    const averageRatingNumber = faker.datatype.number({
      min: 1,
      max: 5,
      precision: 0.1,
    });
    const totalRatingNumber = faker.datatype.number({
      min: 0,
      max: 10000,
    });
    const enrolledStudents = faker.datatype.number({
      min: 0,
      max: 10000,
    });
    const startedDate = faker.date.past();
    const teacher = faker.name.firstName() + ' ' + faker.name.lastName();

    const comments = generateComments;
    const contentSections = generateContentSections;
    const categories = generateCategories;

    courses.push({
      id,
      title,
      description,
      picture,
      detail,
      hoursToFinished,
      price,
      averageRatingNumber,
      totalRatingNumber,
      enrolledStudents,
      startedDate,
      teacher,
      comments,
      contentSections,
      categories,
    });
  }

  return courses;
}

module.exports = generateCourses();
