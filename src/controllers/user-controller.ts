import { IJwtService } from '@/core/application/services/jwt.service';
import { IUserService } from '@/core/application/services/user.service';
import { TApiResponse } from '@/core/application/types/api/response';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  constructor(private userService: IUserService, private jwtService: IJwtService) {}

  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      //req.query.id is supposed to have been validated by the validation middleware
      const result = await this.userService.getUserById(req.query.id as string);
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

      const { accessToken, refreshToken } = this.jwtService.generateTokens(result.data.id);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      });

      this.handleSuccessResponse(res, result.data, 201);
    } catch (error) {
      next(error);
    }
  }

  private handleSuccessResponse<T>(res: Response, data: T, statusCode: number = 200): void {
    const response = {
      success: true,
      data,
    } as const satisfies TApiResponse<T>;
    res.status(statusCode).json(response);
  }
}
