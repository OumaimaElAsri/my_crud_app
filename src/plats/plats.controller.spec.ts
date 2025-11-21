import { Test, TestingModule } from '@nestjs/testing';
import { PlatsController } from './plats.controller';
import { PlatsService } from './plats.service';

describe('PlatsController', () => {
  let controller: PlatsController;

HEAD
  const mockService = {

  const mockPlatsService = {
4db047eb5cf0d077ab5ad3457bc7c2825184256c
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatsController],
      providers: [
        {
          provide: PlatsService,
HEAD
          useValue: mockService,

          useValue: mockPlatsService
           4db047eb5cf0d077ab5ad3457bc7c2825184256c
        },
      ],
    }).compile();

    controller = module.get<PlatsController>(PlatsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
