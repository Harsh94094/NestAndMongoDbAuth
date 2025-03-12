"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UploadController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const unzipper = require("unzipper");
const fs = require("fs");
const path = require("path");
const uploades_service_1 = require("./uploades.service");
const recursive = require("recursive-readdir");
let UploadController = UploadController_1 = class UploadController {
    openAiService;
    logger = new common_1.Logger(UploadController_1.name);
    constructor(openAiService) {
        this.openAiService = openAiService;
    }
    async uploadFile(file, prompt) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded.');
        }
        const uploadPath = path.resolve('uploads', file.filename);
        const extractPath = path.resolve('uploads', 'extracted', `${Date.now()}`);
        this.logger.log(`File uploaded to: ${uploadPath}`);
        if (!fs.existsSync(uploadPath)) {
            throw new common_1.BadRequestException(`File not found: ${uploadPath}`);
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
    async processExtractedImages(folderPath, prompt) {
        console.log("Scanning extracted folder recursively:", folderPath);
        const files = await recursive(folderPath);
        console.log("Extracted files:", files);
        const imageDescriptions = [];
        for (const filePath of files) {
            if (filePath.match(/\.(jpg|jpeg|png|gif)$/i)) {
                console.log("Processing image:", filePath);
                const description = await this.openAiService.generatePromptFromImage(filePath, prompt);
                console.log("Description generated:", description);
                imageDescriptions.push({ file: path.basename(filePath), description });
            }
            else {
                console.warn("Skipping non-image file:", filePath);
            }
        }
        return imageDescriptions;
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
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
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)("prompt")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
exports.UploadController = UploadController = UploadController_1 = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [uploades_service_1.UploadsService])
], UploadController);
//# sourceMappingURL=uploades.controller.js.map