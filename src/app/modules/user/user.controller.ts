import { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import { UserServices } from "./user.service";
import config from "../../config";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from 'http-status';

const signUpUserByEmailandPassword: RequestHandler = catchAsync(async (req, res) => {
    const { refreshToken, accessToken, user } = await UserServices.SignUp(req.body);

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is created in successfully',
        data: { accessToken, user },
    });
})
const LoginUserByEmailandPassword: RequestHandler = catchAsync(async (req, res) => {
    const { user,accessToken,refreshToken } = await UserServices.login(req.body);

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Logged in successfully',
        data: { accessToken, user },
    });
})
const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;

    const result = await UserServices.changePassword(req.user, passwordData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password is udpated in successfully',
      data: result,
    });
  });
  const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
  
    const result = await UserServices.refreshToken(refreshToken);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Access token retrieved successfully',
      data: result,
    });
  });
  
export const UserControllers = {
    signUpUserByEmailandPassword,
    LoginUserByEmailandPassword,
    changePassword,
    refreshToken
};
