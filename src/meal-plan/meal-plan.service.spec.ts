import { Test, TestingModule } from '@nestjs/testing';
import { MealPlanService } from './meal-plan.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MealPlan } from '../entities/meal-plan.entity';
import { User } from '../entities/user.entity';

describe('MealPlanService', () => {
  let service: MealPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MealPlanService,
        {
          provide: getRepositoryToken(MealPlan),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
        { provide: getRepositoryToken(User), useValue: { findOne: jest.fn() } },
      ],
    }).compile();
    service = module.get<MealPlanService>(MealPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests for create, findByUser, findOne, remove
});
