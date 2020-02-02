
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/byob',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  seeds: {
    directory:'./db/seeds/dev'
  }
};
