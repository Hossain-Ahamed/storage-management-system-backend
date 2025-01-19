import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status';
import { FolderModel } from "../StorageSytem/storageSystem.model";
import config from "../../config";
import { createToken } from "./user.utils";

const SignUp = async (payload: TUser) => {
    const isUserExist = await User.isUserExistsByEmail(payload.email);
    if (isUserExist) {
        throw new AppError(httpStatus.CONFLICT, 'User Already exists');
    }

    const userData: Partial<TUser> = {
        email: payload.email,
        userName: payload.userName,
        password: payload.password,
    };

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // Create the user
        const user = await User.create([userData], { session });
        if (!user.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }

        const folderData = {
            userID: user[0]._id,
            folderName: 'Root',
            access: [user[0]._id],
        }

        // Create the root folder
        const newRootFolder = await FolderModel.create([folderData], { session });
        if (!newRootFolder.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Root folder');
        }

        //Update the user with rootFolderID
        const updateResult = await User.updateOne(
            { _id: user[0]._id },
            { rootFolderID: newRootFolder[0]._id },
            { session }
        );

        if (!updateResult.matchedCount || !updateResult.modifiedCount) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to associate root folder with user');
        }


        await session.commitTransaction();

        // create token and sent to the client

        const jwtPayload = {
            userId: user[0]._id,
            email: user[0].email,
            rootFolder: newRootFolder[0]._id
        };
        const accessToken = createToken(
            jwtPayload,
            config.JWT_ACCESS_SECRET as string,
            config.JWT_ACCESS_EXPIRES_IN as string,
        );

        const refreshToken = createToken(
            jwtPayload,
            config.JWT_REFRESH_SECRET as string,
            config.JWT_REFRESH_EXPIRES_IN as string,
        );


        return {
            user: {
                _id: user[0]._id,
                email: user[0].email,
                userName: user[0].userName,
                rootFolderID: newRootFolder[0]._id,
            },
            accessToken,
            refreshToken
        };
    } catch (error) {

        await session.abortTransaction();

        throw new AppError(
            httpStatus.BAD_REQUEST,
            (error as Error).message || 'An unknown error occurred',
            (error as Error)?.stack,
        );
    } finally {

        await session.endSession();
    }
}

export const UserServices = {
    SignUp
}