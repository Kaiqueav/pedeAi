import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  // Caminho correto para encontrar as entidades em desenvolvimento E produção
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // Caminho correto para encontrar as migrações em desenvolvimento E produção
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;