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

export const UserControllers = {
    signUpUserByEmailandPassword,
};
