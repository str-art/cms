module.exports = {
    "type": "postgres",
    "host": process.env.POSTGRES_HOST,
    "port": 5432,
    "username": "postgres",
    "password":"CMS",
    "database": "cms",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": false,
    "logging": "all",
    "subscribers": ["dist/**/*.subscriber{.ts,.js}"],
    "migrations": ["dist/migration/*.js"],
    "cli": {
      "migrationsDir": "migration"
    }
  }