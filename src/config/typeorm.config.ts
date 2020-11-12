import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig :TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'chat',
    username: 'postgres',
    password: 'postgres',
    synchronize: true,
    entities: [
        __dirname + '/../**/*.entity.{ts,js}'
    ]
}