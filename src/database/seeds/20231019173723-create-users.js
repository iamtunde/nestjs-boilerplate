'use strict';

const argon = require('argon2');
const { v4: uuid } = require('uuid');

async function hashPassword(password) {
  try {
      return await argon.hash(password)
  } catch {
      console.log('Error');
  }
}

const date = (new Date()).toISOString()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   /*  *
     * Add seed commands here.
     *
     * 
    */
     await queryInterface.bulkInsert('Users', [
      {
        id: uuid(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: await hashPassword('secret'),
        phone: '123456789',
        createdAt: date,
        updatedAt: date
      },
      {
        id: uuid(),
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        password: await hashPassword('secret'),
        phone: '987654321',
        createdAt: date,
        updatedAt: date
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
