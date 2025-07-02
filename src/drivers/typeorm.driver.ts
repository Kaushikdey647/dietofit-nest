import { DataSource } from 'typeorm';
import { DatabaseDriver } from '../interfaces/database-driver.interface';

export class TypeOrmDriver implements DatabaseDriver {
  constructor(private readonly dataSource: DataSource) {}

  async init(): Promise<void> {
    // Optionally ensure connection is established
    await this.dataSource.initialize();
  }

  async healthCheck(): Promise<'ok' | 'error'> {
    try {
      await this.dataSource.query('SELECT 1');
      return 'ok';
    } catch {
      return 'error';
    }
  }

  async close(): Promise<void> {
    await this.dataSource.destroy();
  }
}
