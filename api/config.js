module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './db.development.sqlite'
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:'
  },
  production: {
    dialect: 'sqlite',
    storage: './db.production.sqlite'
  }
};