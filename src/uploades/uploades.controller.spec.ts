import { Test, TestingModule } from '@nestjs/testing';
import { UploadesController } from './uploades.controller';

describe('UploadesController', () => {
  let controller: UploadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadesController],
    }).compile();

    controller = module.get<UploadesController>(UploadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
