import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistService } from './checklist.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Checklist } from '../entities/checklist.entity';
import { User } from '../entities/user.entity';

describe('ChecklistService', () => {
  let service: ChecklistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChecklistService,
        { provide: getRepositoryToken(Checklist), useValue: { create: jest.fn(), save: jest.fn(), find: jest.fn(), findOne: jest.fn(), delete: jest.fn() } },
        { provide: getRepositoryToken(User), useValue: { findOne: jest.fn() } },
      ],
    }).compile();
    service = module.get<ChecklistService>(ChecklistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests for create, findByUser, findOne, remove
});
