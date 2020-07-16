'use strict';
const faker = require('faker');

function addStudents(num) {
  let students = [];
  for (let i = 0; i < num; i++) {i
    students.push({
      full_name:            faker.name.findName(),
      admission_number:     faker.random.number(),
      email_address:                faker.internet.email(),
      dob:                  faker.date.past(),
      phone:                faker.random.number(),
      course:               faker.random.word(),
      gender:               faker.random.boolean(),
      profile_picture:      faker.image.imageUrl(),
      createdAt:            new Date(),
      updatedAt:            new Date()
    });
  };
  return students;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Students',addStudents(20), {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('Students', null, {});
     
  }
};
