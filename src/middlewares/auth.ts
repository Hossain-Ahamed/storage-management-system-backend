import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../app/errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../app/config';
import { TUserRole } from '../app/modules/user/user.interface';
import { User } from '../app/modules/user/user.model';

export const auth = (...requierdRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //check if token exist
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthrized access');
    }

    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    const user = await User.isUserExistsByCustomId(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'User is already removed from system',
      );
    }

    // checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
    }

    //check if the token is generated before the  password has changed
    if (
      user?.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You are not authorized. Log in Again',
      );
    }

    //the role includes or not
    if (requierdRoles && !requierdRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthrized access');
    }

    //merge all
    req.user = decoded as JwtPayload;
    next();
  });
};
