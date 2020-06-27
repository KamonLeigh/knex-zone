/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

exports.up = function (knex, Promise) {
  return knex.schema.createTable('todo', (tbl) => {
    tbl.increments('id').primary();
    tbl.text('task', 128).notNullable();
    tbl.integer('author').unsigned().notNullable();
    tbl.timestamps(true, true);

    tbl.foreign('author').references('id').inTable('user');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('todo');
};
