/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
  return knex.schema.createTable('user', (tbl) => {
    tbl.increments('id').primary();
    tbl.string('username');
    tbl.string('email');
    tbl.string('password');
    tbl.timestamps(true, true);
    tbl.string('token');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('user');
};
