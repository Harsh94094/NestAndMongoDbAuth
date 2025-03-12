import { Document } from 'mongoose';
export declare class Image extends Document {
    filename: string;
    modelName: string;
    triggerWord: string;
    originalUrl: string;
    convertedUrl: string;
}
export declare const ImageSchema: import("mongoose").Schema<Image, import("mongoose").Model<Image, any, any, any, Document<unknown, any, Image> & Image & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Image, Document<unknown, {}, import("mongoose").FlatRecord<Image>> & import("mongoose").FlatRecord<Image> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
