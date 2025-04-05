import type { IUserService } from '@/core/application/services/user.service';
import type { AuthenticatedRequest } from '@/core/application/types/api/request';
import type { TResult } from '@/core/application/types/result';
import type { NextFunction, Request, Response } from 'express';

export class UserController {
  constructor(private userService: IUserService) {}

  async getUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.user;

      const result = await this.userService.getUserById(id);
      if (!result.success) {
        next(result.error);
        return;
      }

      this.handleSuccessResponse(res, result.data);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.userService.createUser(req.body);
      if (!result.success) {
        next(result.error);
        return;
      }

      this.handleSuccessResponse(res, result.data, 201);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.userService.updateUser(req.user.id, req.body);
      if (!result.success) {
        next(result.error);
        return;
      }

      this.handleSuccessResponse(res, result.data);
    } catch (error) {
      next(error);
    }
  }

  private handleSuccessResponse<T>(res: Response, data: T, statusCode: number = 200): void {
    const response = {
      success: true,
      data,
    } as const satisfies TResult<T>;
    res.status(statusCode).json(response);
  }
}
