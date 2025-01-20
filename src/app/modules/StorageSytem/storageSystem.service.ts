import { Types } from "mongoose";
import { FolderModel } from "./storageSystem.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';

const createFolder = async (
    folderName: string,
    isSecured: boolean,
    parentFolderID: Types.ObjectId,
    FolderOwnerID: Types.ObjectId,
    currentUserEmail: string
) => {
    const user = await User.findOne({ email: currentUserEmail }).select('_id');

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'user not found')
    }
    const access = FolderOwnerID.toString() === user._id.toString() ? [FolderOwnerID] : [FolderOwnerID, user._id];
    const newFolder = await FolderModel.create({
        userID: FolderOwnerID,
        folderName,
        parent: parentFolderID,
        isSecured,
        access: access
    })

    return newFolder;
};

const shareFolder = async (
    folderID: Types.ObjectId,
    userEmail: string
) => {
    // Find the user
    const user = await User.findOne({ email: userEmail }).select('_id');

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Add the user to access list
    const updatedFolder = await FolderModel.findOneAndUpdate(
        { _id: folderID },
        { $addToSet: { access: user._id } },
        { new: true } 
    );

    if (!updatedFolder) {
        throw new AppError(httpStatus.NOT_FOUND, 'Folder not found');
    }

    return updatedFolder;
};
export const StorageServices = {
    createFolder,
    shareFolder
};
