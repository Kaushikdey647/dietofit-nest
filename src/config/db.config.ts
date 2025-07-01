export enum DbReadWriteMode {
  POSTGRES = 'postgres',
  MONGO = 'mongo',
  HYBRID = 'hybrid', // read from one, write to both
}

export interface DbConfig {
  read: DbReadWriteMode;
  write: DbReadWriteMode | 'both';
}

export const dbConfig: DbConfig = {
  read: process.env.DB_READ_MODE as DbReadWriteMode || DbReadWriteMode.POSTGRES,
  write: process.env.DB_WRITE_MODE as DbReadWriteMode || 'both',
};
