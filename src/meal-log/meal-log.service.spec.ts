import { Test, TestingModule } from '@nestjs/testing';
import { MealLogService } from './meal-log.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MealLog } from '../entities/meal-log.entity';
import { User } from '../entities/user.entity';

describe('MealLogService', () => {
  let service: MealLogService;
  let repo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MealLogService,
        { provide: getRepositoryToken(MealLog), useValue: { create: jest.fn(), save: jest.fn(), find: jest.fn(), findOne: jest.fn(), delete: jest.fn() } },
        { provide: getRepositoryToken(User), useValue: { findOne: jest.fn() } },
      ],
    }).compile();
    service = module.get<MealLogService>(MealLogService);
    repo = module.get(getRepositoryToken(MealLog));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests for create, findByUser, findOne, remove
});
