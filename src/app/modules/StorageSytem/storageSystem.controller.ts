import { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import { StorageServices } from "./storageSystem.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from 'http-status';
import AppError from "../../errors/AppError";

const createFolder: RequestHandler = catchAsync(async (req, res) => {
    const { isSecured, parentFolderID, userID } = req.folderInfo;
    const folderName = req.body?.folderName;
    const { email } = req.user
    const result = await StorageServices.createFolder(folderName, isSecured, parentFolderID, userID, email);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Folder created successfully',
        data: result,
    });
});

const shareFolder: RequestHandler = catchAsync(async (req, res) => {
    const folderID = req.body?.folderID;
    const email = req.body?.email
    const result = await StorageServices.shareFolder(folderID, email);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Folder shared successfully',
        data: result,
    });
});
const duplicateFolder: RequestHandler = catchAsync(async (req, res) => {

    const result = await StorageServices.duplicateFolder(req.body?.folderID);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Folder is duplicated successfully',
        data: result,
    });
});
const updateFolder: RequestHandler = catchAsync(async (req, res) => {
    const folderID = req.query?.folderID;

    if (!folderID || Array.isArray(folderID)) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Folder ID is required');
    }
    const result = await StorageServices.updateFolder(folderID as string, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Folder is updated successfully',
        data: result,
    });
});

const deleteFolder: RequestHandler = catchAsync(async (req, res) => {
    const folderID = req.query?.folderID;

    if (!folderID || Array.isArray(folderID)) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Folder ID is required');
    }
    const result = await StorageServices.deleteFolder(folderID as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Folder is deleted successfully',
        data: result,
    });
});

/**
 * ----------------------- File Management --------------------------
 */

const createFile : RequestHandler = catchAsync(async (req, res) => {
    const folderInfo = req.folderInfo;
    const {email} = req.user;
    const result = await StorageServices.createFile(req.file,folderInfo,email);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'New file uploaded successfully',
      data: result,
    });
  });
  

export const StorageControllers = {
    createFolder,
    shareFolder,
    duplicateFolder,
    updateFolder,
    deleteFolder,
    createFile
};
