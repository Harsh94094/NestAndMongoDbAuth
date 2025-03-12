import { 
    Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Logger, 
    Body
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as unzipper from 'unzipper';
import * as fs from 'fs';
import * as path from 'path';
import { UploadsService } from './uploades.service';
import * as recursive from 'recursive-readdir';
@Controller('upload')
export class UploadController {
    private readonly logger = new Logger(UploadController.name);

    constructor(private readonly openAiService: UploadsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                const uploadDir = path.resolve('uploads');
                fs.mkdirSync(uploadDir, { recursive: true });
                cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                const uniqueName = `${Date.now()}-${file.originalname}`;
                cb(null, uniqueName);
            },
        }),
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body("prompt") prompt: string): Promise<any> {
        if (!file) {
            throw new BadRequestException('No file uploaded.');
        }

        const uploadPath = path.resolve('uploads', file.filename);
        const extractPath = path.resolve('uploads', 'extracted', `${Date.now()}`);

        this.logger.log(`File uploaded to: ${uploadPath}`);

        if (!fs.existsSync(uploadPath)) {
            throw new BadRequestException(`File not found: ${uploadPath}`);
        }

        await fs.promises.mkdir(extractPath, { recursive: true });

        await new Promise((resolve, reject) => {
            fs.createReadStream(uploadPath)
                .pipe(unzipper.Extract({ path: extractPath }))
                .on('close', resolve)
                .on('error', reject);
        });

        this.logger.log(`Files extracted to: ${extractPath}`);

        const imageDescriptions = await this.processExtractedImages(extractPath, prompt);

        return { message: 'File uploaded, extracted, and processed', data: imageDescriptions };
    }



    private async processExtractedImages(folderPath: string, prompt: string): Promise<any[]> {
        console.log("Scanning extracted folder recursively:", folderPath);
    
        const files = await recursive(folderPath);
        console.log("Extracted files:", files);
    
        const imageDescriptions: any[] = [];
    
        for (const filePath of files) {
            if (filePath.match(/\.(jpg|jpeg|png|gif)$/i)) {
                console.log("Processing image:", filePath);
                const description = await this.openAiService.generatePromptFromImage(filePath, prompt);
                console.log("Description generated:", description);
                imageDescriptions.push({ file: path.basename(filePath), description });
            } else {
                console.warn("Skipping non-image file:", filePath);
            }
        }
    
        return imageDescriptions;
    }
    
    
    
}
