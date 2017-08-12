const knex = require('./connect');

knex('users').insert({
  name: 'test_user',
  token: 'sdhi239hwher23hwe332w32n23',
  domain: 'pay.yinsunz.com'
}).then(res => console.log(res))
