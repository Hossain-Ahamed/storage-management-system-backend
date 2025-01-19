import { Types } from "mongoose"

export type TFileTypes = "PDF" | "Image" | "Document"
export type TFolder = {
    userID:Types.ObjectId;
    folderName : string;
    access : Types.ObjectId[];
    parent : Types.ObjectId;
    isFavorite: boolean;
    isSecured: boolean;
    isDeleted: boolean;
}

export type TFile = {
    name : string;
    uniqueFileName : string;
    path : string;
    dataType : TFileTypes,
    fileSize : number,
    isFavorite: boolean;
    isSecured: boolean;
    isDeleted: boolean;
    userID:Types.ObjectId;
    FolderID:Types.ObjectId;
    access : Types.ObjectId[];
}