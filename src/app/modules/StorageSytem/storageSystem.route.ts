import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import { StorageValidationSchema } from './storageSystem.validation';
import { isAllowed } from '../../../middlewares/auth';
import { StorageControllers } from './storageSystem.controller';
import { upload } from '../../../middlewares/uploadFiles';
const router = express.Router();

router.post(
    '/create-folder',
    validateRequest(StorageValidationSchema.createFolderValidationSchema),
    isAllowed(),
    StorageControllers.createFolder,
);
router.post(
    '/share-folder',
    validateRequest(StorageValidationSchema.shareFolderValidationSchema),
    isAllowed(),
    StorageControllers.shareFolder,
);
router.post(
    '/duplicate-folder',
    validateRequest(StorageValidationSchema.duplicateFolderValidationSchema),
    isAllowed(),
    StorageControllers.duplicateFolder,
);
router.patch(
    '/update-folder',
    validateRequest(StorageValidationSchema.updateFolderValidationSchema),
    isAllowed(),
    StorageControllers.updateFolder,
);
router.delete(
    '/delete-folder',
    isAllowed(),
    StorageControllers.deleteFolder,
);


router.post(
    '/upload-file',
    isAllowed(),
    upload.single('file'),
    StorageControllers.createFile,
  );
export const StorageSystemRouter = router;