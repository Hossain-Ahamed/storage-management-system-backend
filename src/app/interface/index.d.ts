import { JwtPayload } from 'jsonwebtoken';
import { TFolderInfo } from '../modules/StorageSytem/storageSystem.interface';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
      folderInfo:TFolderInfo;
    }
  }
}
