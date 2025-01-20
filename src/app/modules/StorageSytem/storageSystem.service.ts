import { FolderModel } from "./storageSystem.model";

const createFolder = async () => {
    return await FolderModel.find().sort({ _id: 1 });
  };
export const StorageServices = {
    createFolder
  };
  