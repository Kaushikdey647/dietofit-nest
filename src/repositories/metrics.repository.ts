import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from 'typeorm';
import { Model } from 'mongoose';
import { MetricRecord } from '../entities/metric-record.entity';
import { IMetricRecord, IMetricRecordMongo } from '../interfaces/metric-record.interface';
import { MetricRecordDocument } from '../schemas/metric-record.schema';
import { dbConfig, DbReadWriteMode } from '../config/db.config';
import { User } from '../entities/user.entity';

@Injectable()
export class MetricsRepository {
  constructor(
    @InjectRepository(MetricRecord)
    private readonly pgRepo: Repository<MetricRecord>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectModel('MetricRecord')
    private readonly mongoModel: Model<MetricRecordDocument>,
  ) {}

  async create(record: Partial<IMetricRecord>): Promise<void> {
    try {
      // Write to Postgres if enabled
      if (dbConfig.write === 'both' || dbConfig.write === DbReadWriteMode.POSTGRES) {
        const user = await this.userRepo.findOne({ where: { id: record.user as number } });
        if (!user) throw new NotFoundException('User not found');
        await this.pgRepo.save({ ...record, user });
      }
      // Write to Mongo if enabled
      if (dbConfig.write === 'both' || dbConfig.write === DbReadWriteMode.MONGO) {
        await this.mongoModel.create({ ...record, user: record.user });
      }
    } catch (e) {
      throw new BadRequestException('Failed to create metric record');
    }
  }

  async findAll(userId: number | string): Promise<IMetricRecord[] | IMetricRecordMongo[]> {
    try {
      if (dbConfig.read === DbReadWriteMode.POSTGRES) {
        const user = await this.userRepo.findOne({ where: { id: userId as number } });
        if (!user) throw new NotFoundException('User not found');
        const records = await this.pgRepo.find({ where: { userId: userId as number } });
        return records.map((rec) => ({
          id: rec.id,
          user: rec.userId,
          weight: rec.weight,
          fatMass: rec.fatMass,
          lbm: rec.lbm,
          smm: rec.smm,
          waterPercent: rec.waterPercent,
          timestamp: rec.timestamp,
          age: 0, // Not present in entity, set to 0
          height: 0, // Not present in entity, set to 0
        }));
      } else {
        // MongoDB: userId is stored as string or ObjectId
        return (await this.mongoModel.find({ user: userId }).exec()) as IMetricRecordMongo[];
      }
    } catch (e) {
      throw new BadRequestException('Failed to fetch metric records');
    }
  }
}
