import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import { StorageValidationSchema } from './storageSystem.validation';
import { isAllowed } from '../../../middlewares/auth';
import { StorageControllers } from './storageSystem.controller';
const router = express.Router();

router.post(
    '/create-folder',
    validateRequest(StorageValidationSchema.createFolderValidationSchema),
    isAllowed(),
    StorageControllers.createFolder,
  );
export const StorageSystemRouter = router;