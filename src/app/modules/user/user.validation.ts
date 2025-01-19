import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Email is required' }),
        password: z.string({ required_error: 'Password is required' }),
    }),
});

const CreateUserByEmailAndPasswordValidationSchema = z.object({
    body: z.object({
        userName: z.string({ required_error: "Name is required" }),
        email: z.string().email("Invalid email address"),
        password: z
            .string({
                invalid_type_error: 'Password must be string',
            })
            .min(6, { message: 'password must be at least 6 character' })

    })
})

const ChangePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({ required_error: 'Old Password is required' }),
        newPassword: z.string({ required_error: 'New Password is required' }),
    }),
});



const forgetPasswordValidationSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Email is required' }),
    }),
});
const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({ required_error: 'refresh token is required' }),
    }),
});

export const UserValidation = {
    CreateUserByEmailAndPasswordValidationSchema,
    loginValidationSchema,
    refreshTokenValidationSchema,
    forgetPasswordValidationSchema,
    ChangePasswordValidationSchema,
};
