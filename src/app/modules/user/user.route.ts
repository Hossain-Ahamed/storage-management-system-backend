import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
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
export const UserRouter = router;
