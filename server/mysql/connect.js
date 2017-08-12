const config = require('../config.json').mysql

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  }
})
module.exports = knex;
