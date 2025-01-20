import { Types } from "mongoose";
import { FileModel, FolderModel } from "./storageSystem.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';
import { TFolder, TFolderInfo } from "./storageSystem.interface";
import path from "path";

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

const duplicateFolder = async (folderID: Types.ObjectId) => {

    const originalFolder = await FolderModel.findById(folderID);

    if (!originalFolder) {
        throw new AppError(httpStatus.NOT_FOUND, 'Original Folder not found');
    }

    // Create a new folder with a modified name (appending " - Copy" to the original folder name)
    const newFolderName = `${originalFolder.folderName} - Copy`;

    const duplicatedFolder = await FolderModel.create({
        userID: originalFolder.userID,
        folderName: newFolderName,
        parent: originalFolder.parent,
        isSecured: originalFolder.isSecured,
        access: [...originalFolder.access],
    })
    return duplicatedFolder;
};

const updateFolder = async (folderID: string, payload: Partial<TFolder>) => {
    const updatedFolder = await FolderModel.findByIdAndUpdate(
        folderID,
        { $set: payload },
        { new: true, runValidators: true }
    );

    if (!updatedFolder) {
        throw new AppError(httpStatus.NOT_FOUND, 'Folder not found');
    }

    return updatedFolder;
};
const deleteFolder = async (folderID: string) => {
    await FolderModel.findByIdAndUpdate(
        folderID,
        { isDeleted: true }
    );

    return null;
};

// Allowed file types and categories
const allowedFileTypes: { [key: string]: string[] } = {
    Image: ['jpg', 'jpeg', 'png', 'webp'],
    Document: ['doc', 'docx', 'txt'],
    PDF: ['pdf'],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createFile = async (file: any, folderInfo: TFolderInfo, currentUserEmail: string) => {
    if (!file) {
      throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded');
    }
  
    const user = await User.findOne({ email: currentUserEmail }).select('_id limit'); 
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
  
    // Calculate total storage used
    const totalUsedStorage = await FileModel.aggregate([
      { $match: { userID: user._id } },
      { $group: { _id: null, totalSize: { $sum: '$fileSize' } } }, 
    ]);
    const currentStorageUsed = totalUsedStorage[0]?.totalSize || 0;
    if (currentStorageUsed + file.size > user.limit) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Storage limit exceeded');
    }
  
 
    const fileExtension = path.extname(file.originalname).slice(1).toLowerCase();
    const dataType = Object.keys(allowedFileTypes).find((key) =>
      allowedFileTypes[key].includes(fileExtension)
    );
  

  
   
    const newFile = await FileModel.create({
      name: file.originalname,
      uniqueFileName: file.filename,
      path: file.path,
      dataType,
      fileSize: file.size,
      isSecured: folderInfo.isSecured,
      folderID : folderInfo.parentFolderID,
      userID: folderInfo.userID,
      access: folderInfo.allowedUser,
    });
  
    return newFile;
  };
  

export const StorageServices = {
    createFolder,
    shareFolder,
    duplicateFolder,
    updateFolder,
    deleteFolder,
    createFile
};
