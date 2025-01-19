/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface TUserVerificationInfo {
    OTP: string;
    OTPExpiresAt: Date;
    OTPUsed: boolean;
}
export interface TUser {
    _id : Types.ObjectId;
    userName: string;
    googleID?: string;
    email: string;
    password?: string;
    passwordChangedAt?: Date;
    secureFolderPin?: string;
    rootFolderID : Types.ObjectId;
    limit : number;
    verificationInfo : TUserVerificationInfo
    isDeleted: boolean;
}
export type TLoginUser = {
    email: string;
    password: string;
  };
export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>;
    isOTPVerified(OTP: string, SavedOTP: string,OTPExpiresAt :number, OTPUsed : boolean) : Promise<boolean>;
    isPasswordMatched(plainTextPassword: string, hashPassword: string): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(passordChangeTimeStamp: Date, JwtIssuedTimeStamp: number): boolean;
}
