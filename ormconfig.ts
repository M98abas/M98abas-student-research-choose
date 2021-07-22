module.exports = {
    "type": "mysql",
    "host": process.env.HOST,
    "port": process.env.PORT,
    "username": "root",
    "password": "",
    "database": process.env.DATABASE,
    "synchronize": true, 
    "logging": false,
    "entities": [
       "src/entity/**/*.ts"
    ],
    "migrations": [
       "src/migration/**/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts"
    ],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    }
 }