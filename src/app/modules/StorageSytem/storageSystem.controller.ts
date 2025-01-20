import { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import { StorageServices } from "./storageSystem.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from 'http-status';

const createFolder: RequestHandler = catchAsync(async (req, res) => {

    console.log(req.folderInfo, req.user)
    // const zodParseData = StudentZodValidationSchema.parse(studentData);
    // const result = await StorageServices.createFolder(
    //   req.file,
    //   password,
    //   studentData,
    // );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student created successfully',
        data: 'result',
    });
});

export const StorageControllers = {
    createFolder,
};
