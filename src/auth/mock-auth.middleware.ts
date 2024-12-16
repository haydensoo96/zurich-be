import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from './user.interface.js';
import * as dotenv from 'dotenv';

dotenv.config();

declare module 'express' {
  export interface Request {
    user?: User;
  }
}

@Injectable()
export class MockAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.user = {
      id: 1,
      username: 'dev',
      roles: ['admin'],
    };

    next();
  }
}
