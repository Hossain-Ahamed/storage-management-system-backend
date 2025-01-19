/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface TUserVerificationInfo {
    OTP: string;
    OTPExpiresAt: Date;
    OTPUsed: boolean;
}
export interface TUser {
    userName: string;
    googleID?: string;
    email: string;
    password?: string;
    passwordChangedAt?: Date;
    secureFolderPin?: string;
    rootFolderID : Types.ObjectId;
    verificationInfo : TUserVerificationInfo
    isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>;
    isOTPVerified(OTP: string, SavedOTP: string,OTPExpiresAt :Date, OTPUsed : boolean) : Promise<boolean>;
    isPasswordMatched(plainTextPassword: string, hashPassword: string): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(passordChangeTimeStamp: Date, JwtIssuedTimeStamp: number): boolean;
}
