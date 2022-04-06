const path = require('path');

const mockFile = (schema) => {
  return require(path.join(__dirname, 'mock/', schema));
};

module.exports = () => {
  return {
    categories: mockFile('categories.js'),
    users: mockFile('users.js'),
    teachers: mockFile('teachers.js'),
    admins: mockFile('admins.js'),
    courses: mockFile('courses.js'),
    recommendations: mockFile('recommendations.js'),
  };
};
