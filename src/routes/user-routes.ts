import { UserController } from '@/controllers/user-controller';
import { validateRequest } from '@/middleware/validation.middleware';
import { InMemoryUserRepository } from '@/repositories/user/in-memory-user-repository';
import { UserService } from '@/services/user/user-service';
import { newUserDtoSchema } from '@/types/dtos/user.dto';
import { Router } from 'express';
import { z } from 'zod';

// Schema for validating user ID
const userIdSchema = z.object({
  id: z.string().uuid('Invalid user ID format'),
});

export function generateUserRouter(): Router {
  const router = Router();
  const userService = new UserService(new InMemoryUserRepository());
  const userController = new UserController(userService);

  router.post('/new', validateRequest(newUserDtoSchema), (req, res, next) =>
    userController.createUser(req, res, next),
  );
  router.get('/', validateRequest(userIdSchema, 'query'), (req, res, next) =>
    userController.getUser(req, res, next),
  );

  return router;
}
