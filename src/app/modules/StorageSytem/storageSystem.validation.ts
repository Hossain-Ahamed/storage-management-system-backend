import { z } from "zod";

const createFolderValidationSchema = z.object({
    body: z.object({
        folderName: z.string({ required_error: 'Folder Name is required' }),
        parentFolder: z.string({ required_error: 'New Password is required' }),
    }),
});

export const StorageValidationSchema = {
    createFolderValidationSchema,
}