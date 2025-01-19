import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import { auth } from '../../../middlewares/auth';
const router = express.Router();
router.post(
    '/sign-up',
    validateRequest(UserValidation.SignUpByEmailAndPasswordValidationSchema),
    UserControllers.signUpUserByEmailandPassword
);
router.post(
    '/log-in',
    validateRequest(UserValidation.loginValidationSchema),
    UserControllers.LoginUserByEmailandPassword
);
router.post(
    '/log-in-with-google',
    validateRequest(UserValidation.loginWithGoogleValidationSchema),
    UserControllers.LoginwithGoogle
);
router.post(
    '/change-password',
    auth(),
    validateRequest(UserValidation.ChangePasswordValidationSchema),
    UserControllers.changePassword,
);
router.get(
    '/refresh-token',
    validateRequest(UserValidation.getAccessTokenByRefreshTokenValidationSchema),
    UserControllers.getAccessToken,
);
router.post(
    '/forget-password',
    validateRequest(UserValidation.forgetPasswordValidationSchema),
    UserControllers.forgetPassword,
);

router.post(
    '/verify-OTP',
    validateRequest(UserValidation.verifyOTPValidationSchema),
    UserControllers.verifyOTP,
);
router.post(
    '/reset-password',
    validateRequest(UserValidation.resetPasswordValidationSchema),
    UserControllers.resetPassword,
);

export const UserRouter = router;
