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
    const { user, accessToken, refreshToken } = await UserServices.login(req.body);

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
const LoginwithGoogle: RequestHandler = catchAsync(async (req, res) => {
    const { user, accessToken, refreshToken } = await UserServices.googleAuth(req.body?.tokenId);

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
const getAccessToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;

    const result = await UserServices.getAccessToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Access token retrieved successfully',
        data: result,
    });
});


const forgetPassword = catchAsync(async (req, res) => {
    const email = req.body?.email;
    const result = await UserServices.forgetPassword(email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reset link is sent successfully',
        data: result,
    });
});
const verifyOTP = catchAsync(async (req, res) => {
    const { email, OTP } = req.body;
    const { token } = await UserServices.verifyOTP(email, OTP);

    res.cookie('verifiedUser', token, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Change password within 30 minutes',
        data: '',
    });
});

const resetPassword = catchAsync(async (req, res) => {

    const { verifiedUser } = req.cookies;
    const newPassword = req.body?.newPassword;
    const result = await UserServices.resetPassword(verifiedUser, newPassword);

    res.clearCookie('verifiedUser', {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password Reset Successfully',
        data: result,
    });
});

export const UserControllers = {
    signUpUserByEmailandPassword,
    LoginUserByEmailandPassword,
    LoginwithGoogle,
    changePassword,
    getAccessToken,
    forgetPassword,
    verifyOTP,
    resetPassword
};
