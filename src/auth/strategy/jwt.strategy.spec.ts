import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { JWTStrategy } from './jwt.strategy';
import { User } from '../../schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('JWTStrategy', () => {
  let jwtStrategy: JWTStrategy;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JWTStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('your-jwt-secret'),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    jwtStrategy = module.get<JWTStrategy>(JWTStrategy);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('validate', () => {
    it('should return payload if user is admin', async () => {
      const payload = { sub: 1, email: 'admin@example.com' };
      const user = { isAdmin: true };

      jest.spyOn(userModel, 'findById').mockResolvedValueOnce(user);

      const result = await jwtStrategy.validate(payload);

      expect(userModel.findById).toHaveBeenCalledTimes(1);
      expect(userModel.findById).toHaveBeenCalledWith(payload.sub);
      expect(result).toEqual(payload);
    });

    it('should return undefined if user is not admin', async () => {
      const payload = { sub: 1, email: 'user@example.com' };
      const user = { isAdmin: false };

      jest.spyOn(userModel, 'findById').mockResolvedValueOnce(user);

      const result = await jwtStrategy.validate(payload);

      expect(userModel.findById).toHaveBeenCalledTimes(1);
      expect(userModel.findById).toHaveBeenCalledWith(payload.sub);
      expect(result).toBeUndefined();
    });
  });
});
