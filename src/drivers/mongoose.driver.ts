import * as mongoose from 'mongoose';
import { DatabaseDriver } from '../interfaces/database-driver.interface';

export class MongooseDriver implements DatabaseDriver {
  constructor(private readonly uri: string) {}

  async init(): Promise<void> {
    await mongoose.connect(this.uri);
  }

  async healthCheck(): Promise<'ok' | 'error'> {
    try {
      await mongoose.connect(this.uri);
      await mongoose.disconnect();
      return 'ok';
    } catch {
      return 'error';
    }
  }

  async close(): Promise<void> {
    await mongoose.disconnect();
  }
}
