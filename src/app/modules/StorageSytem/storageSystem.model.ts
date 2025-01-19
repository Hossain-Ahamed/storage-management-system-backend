import { model, Schema } from "mongoose"
import { TFile, TFolder } from "./storageSystem.interface"

const FolderSchema = new Schema<TFolder>(
    {
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User',

        },
        folderName: {
            type: String,
            required: true,
        },
        access: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        childFolder: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Folder',
            },
        ],
        isFavorite: {
            type: Boolean,
            default: false,
        },
        isSecured: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
)

export const FolderModel = model<TFolder>('Folder', FolderSchema);

FolderSchema.pre('save', async function (next) {
    const folder = this as TFolder;

    // Ensure the userID is included in the access array
    if (folder.userID && !folder.access.includes(folder.userID)) {
        folder.access.push(folder.userID);
    }

    next();
});

// filter out deleted documents
FolderSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

FolderSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

FolderSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

const FileSchema = new Schema<TFile>(
    {

        name: {
            type: String,
            required: true,
        },
        uniqueFileName: {
            type: String,
            required: true,
            unique: true
        },
        path: {
            type: String,
            required: true,
        },
        dataType: {
            type: String,
            enum: ['PDF', 'Image', 'Document'],
        },

        isFavorite: {
            type: Boolean,
            default: false,
        },
        isSecured: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        FolderID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        access: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    },
)



export const FileModel = model<TFile>('File', FileSchema);

FileSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const file = this;

    // Ensure the userID is included in the access array
    if (file.userID && !file.access.includes(file.userID)) {
        file.access.push(file.userID);
    }

    next();
});

// filter out deleted documents
FileSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

FileSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

FileSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});