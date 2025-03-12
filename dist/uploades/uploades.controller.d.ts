import { UploadsService } from './uploades.service';
export declare class UploadController {
    private readonly openAiService;
    private readonly logger;
    constructor(openAiService: UploadsService);
    uploadFile(file: Express.Multer.File, prompt: string): Promise<any>;
    private processExtractedImages;
}
