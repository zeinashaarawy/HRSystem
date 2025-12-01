import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeProfileController } from '../../../Employee-Profile-Organization-Structure-and-Performance--main/backend/src/employee-profile/employee-profile.controller';

describe('EmployeeProfileController', () => {
  let controller: EmployeeProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeProfileController],
    }).compile();

    controller = module.get<EmployeeProfileController>(
      EmployeeProfileController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
