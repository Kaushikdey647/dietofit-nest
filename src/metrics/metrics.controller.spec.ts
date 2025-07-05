import { Test, TestingModule } from '@nestjs/testing';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

describe('MetricsController', () => {
  let controller: MetricsController;
  let service: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetricsController],
      providers: [
        {
          provide: MetricsService,
          useValue: {
            addMetric: jest.fn(),
            getUserMetrics: jest.fn().mockResolvedValue([
              {
                id: 1,
                user: 1,
                age: 30,
                weight: 70,
                height: 175,
                timestamp: new Date(),
              },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<MetricsController>(MetricsController);
    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a metric', async () => {
    await expect(
      controller.addMetric({ userId: 1, age: 30, weight: 70, height: 175 }),
    ).resolves.toEqual({ success: true });
    expect(service.addMetric).toHaveBeenCalledWith(1, 30, 70, 175);
  });

  it('should get user metrics', async () => {
    const result = await controller.getUserMetrics('1');
    expect(result).toEqual([
      {
        id: 1,
        user: 1,
        age: 30,
        weight: 70,
        height: 175,
        timestamp: expect.any(Date),
      },
    ]);
    expect(service.getUserMetrics).toHaveBeenCalledWith('1');
  });
});
