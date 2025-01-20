import { z } from "zod";

const createFolderValidationSchema = z.object({
    body: z.object({
        folderName: z.string({ required_error: 'Folder Name is required' }),
        parentFolderID: z.string({ required_error: 'Parent folder ID is required' }),
    }),
});
const shareFolderValidationSchema = z.object({
    body: z.object({
        folderID: z.string({ required_error: 'Folder ID is required' }),
        email: z.string({ required_error: 'Email is required' }),
    }),
});
const duplicateFolderValidationSchema = z.object({
    body: z.object({
        folderID: z.string({ required_error: 'Folder ID is required' }),
    }),
});
const updateFolderValidationSchema = z.object({
    body: z.object({
        folderName: z.string({ required_error: 'Folder ID is required' }).optional(),
        isFavorite : z.boolean().optional(),
    }),
});



export const StorageValidationSchema = {
    createFolderValidationSchema,
    shareFolderValidationSchema,
    duplicateFolderValidationSchema,
    updateFolderValidationSchema
}