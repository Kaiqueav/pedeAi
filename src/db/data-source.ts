import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;