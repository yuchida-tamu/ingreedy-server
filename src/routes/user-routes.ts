import { UserController } from '@/controllers/user-controller';
import type { AuthenticatedRequest } from '@/core/application/types/api/request';
import { newUserDtoSchema, updateUserDtoSchema } from '@/core/application/types/dtos/user.dto';
import { PostgresUserRepository } from '@/infrastructure/repositories/user/postgres-user-repository';
import { AuthMiddleware, authenticateJwt } from '@/middleware/auth.middleware';
import { validateRequest } from '@/middleware/validation.middleware';
import { JwtService } from '@/services/auth/jwt-service';
import { UserService } from '@/services/user/user-service';
import { Router } from 'express';

export function generateUserRouter(): Router {
  const router = Router();
  const userRepository = new PostgresUserRepository();
  const jwtService = new JwtService();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  const authMiddleware = new AuthMiddleware(jwtService);

  const auth = authenticateJwt(jwtService);
  const validateCreateUser = validateRequest(newUserDtoSchema);
  const validateUpdateUser = validateRequest(updateUserDtoSchema);

  router.post(
    '/createUser',
    validateCreateUser,
    userController.createUser,
    authMiddleware.attachTokens,
  );

  router.get('/getUser', auth, (req, res, next) =>
    userController.getUser(req as AuthenticatedRequest, res, next),
  );

  router.put('/updateUser', auth, validateUpdateUser, (req, res, next) =>
    userController.updateUser(req as AuthenticatedRequest, res, next),
  );

  return router;
}
