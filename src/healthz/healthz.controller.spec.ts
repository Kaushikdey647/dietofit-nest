import { Test, TestingModule } from '@nestjs/testing';
import { HealthzController } from './healthz.controller';
import { HealthzService } from './healthz.service';

describe('HealthzController', () => {
  let controller: HealthzController;
  let service: HealthzService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthzController],
      providers: [
        {
          provide: HealthzService,
          useValue: { check: jest.fn().mockResolvedValue({ postgres: 'ok', mongo: 'ok' }) },
        },
      ],
    }).compile();
    controller = module.get<HealthzController>(HealthzController);
    service = module.get<HealthzService>(HealthzService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health status', async () => {
    expect(await controller.check()).toEqual({ postgres: 'ok', mongo: 'ok' });
  });
});
