import { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";

const signUpUserByEmailandPassword : RequestHandler =catchAsync(async(req,res)=>{
    const {userName,email,password} = req.body;
})