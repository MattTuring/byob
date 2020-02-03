
module.exports = {
  production: {
  client: 'pg',
  connection: 'postgres://lgeyeycsouljik:18c' + `?ssl=true`,
  migrations: {
    directory: './db/migrations'
  },
  useNullAsDefault: true
  },
  seeds: {
    directory:'./db/seeds/dev'
  }
};
