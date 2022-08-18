const path = require('path')
require('dotenv').config();
const { DATABASE_URL } = process.env

module.exports = {
  development: {
    client: 'postgresql',
    connection: "postgres://qvyfxdtg:98KeTuagw35Z5-BjYhYkl1q8nV3kgWWX@salt.db.elephantsql.com/qvyfxdtg",
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds")
    }
  },

};
