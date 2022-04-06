const { faker } = require('@faker-js/faker');

function generateVideos() {
  let videos = [];

  for (let i = 0; i < 10; i++) {
    const id = faker.datatype.uuid();
    const title = faker.lorem.sentence();
    const description = faker.lorem.paragraph();
    const canPreview = faker.datatype.boolean();
    const viewers = faker.datatype.number({
      min: 0,
      max: 1000000000,
    });
    const metadata = {
      id: faker.datatype.uuid(),
      duration: faker.datatype.number({
        min: 1,
        max: 60,
      }),
    };

    videos.push({
      id,
      title,
      description,
      canPreview,
      viewers,
      metadata,
    });
  }

  return videos;
}

module.exports = generateVideos();
