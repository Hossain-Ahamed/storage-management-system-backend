import { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import { StorageServices } from "./storageSystem.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from 'http-status';

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

const shareFolder : RequestHandler = catchAsync(async (req, res) => {
    const folderID = req.body?.folderID;
    const email = req.body?.email
    const result = await StorageServices.shareFolder(folderID,email);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Folder shared successfully',
        data: result,
    });
});

export const StorageControllers = {
    createFolder,
    shareFolder,
};
