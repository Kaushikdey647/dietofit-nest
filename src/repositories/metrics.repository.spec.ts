import { Test, TestingModule } from '@nestjs/testing';
import { MetricsRepository } from './metrics.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getModelToken } from '@nestjs/mongoose';
import { MetricRecord } from '../entities/metric-record.entity';
import { User } from '../entities/user.entity';

describe('MetricsRepository', () => {
  let repo: MetricsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsRepository,
        { provide: getRepositoryToken(MetricRecord), useValue: { findOne: jest.fn(), find: jest.fn(), save: jest.fn() } },
        { provide: getRepositoryToken(User), useValue: { findOne: jest.fn() } },
        { provide: getModelToken('MetricRecord'), useValue: { create: jest.fn(), find: jest.fn() } },
      ],
    }).compile();
    repo = module.get<MetricsRepository>(MetricsRepository);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  // Add more tests for create, findAll
});
