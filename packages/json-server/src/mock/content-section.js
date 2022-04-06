const { faker } = require('@faker-js/faker');
const generateVideos = require('./videos');

function generateContentSections() {
  let contents = [];

  for (let i = 0; i < 10; i++) {
    const id = faker.datatype.uuid();
    const courseId = faker.datatype.uuid();
    const chaperNo = i + 1;
    const videos = generateVideos;

    contents.push({
      id,
      courseId,
      chaperNo,
      videos,
    });
  }

  return contents;
}

module.exports = generateContentSections();
