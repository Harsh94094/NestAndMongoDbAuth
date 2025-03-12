"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const openai_1 = require("openai");
const dotenv = require("dotenv");
dotenv.config();
let UploadsService = class UploadsService {
    openai = new openai_1.default({
        apiKey: "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",
    });
    async generatePromptFromImage(imagePath, prompt) {
        try {
            const variations = [];
            if (!fs.existsSync(imagePath)) {
                throw new Error('Image file not found');
            }
            const imageStream = fs.createReadStream(imagePath);
            const response = await this.openai.images.createVariation({
                model: "dall-e-2",
                image: imageStream,
                n: 1,
                size: "1024x1024",
            });
            variations.push({
                original: imagePath,
                variations: response.data.map((img) => img.url),
            });
            return variations;
        }
        catch (error) {
            console.error('Error generating image variation:', error);
            throw new Error('Failed to generate image variation');
        }
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)()
], UploadsService);
//# sourceMappingURL=uploades.service.js.map