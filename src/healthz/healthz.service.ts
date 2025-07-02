import { Injectable } from '@nestjs/common';
import { DatabaseDriver } from '../interfaces/database-driver.interface';

@Injectable()
export class HealthzService {
  constructor(
    private readonly dbDrivers: DatabaseDriver[],
  ) {}

  async check() {
    const results: Record<string, 'ok' | 'error'> = {};
    for (const driver of this.dbDrivers) {
      const name = driver.constructor.name.replace('Driver', '').toLowerCase();
      results[name] = await driver.healthCheck();
    }
    return results;
  }
}
