require('dotenv');

module.exports = [
    {
        name: 'default',
        type: 'postgres',
        host: 'localhost',
        port: process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_NAME,
        entities: ['./dist/modules/**/infra/typeorm/entities/*.ts'],
        migrations: ['./dist/shared/**/infra/typeorm/migrations/*.ts'],
        cli: {
            migrationsDir: './src/shared/infra/typeorm/migrations',
        },
    },
    {
        name: 'mongo',
        type: 'mongodb',
        host: 'localhost',
        port: process.env.MONGO_PORT,
        useUnifiedTopology: true,
        entities: ['./dist/modules/**/infra/typeorm/schemas/*.ts'],
    },
];
