module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './db.development.sqlite'
  },
  test: {
    dialect: 'sqlite',
    storage: './db.test.sqlite'
  },
  production: {
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'example',
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
  }
};