
// import { Injectable, Logger } from '@nestjs/common';
// import * as fs from 'fs';
// import OpenAI from 'openai';

// @Injectable()
// export class UsersService {
//     private openai: OpenAI;
//     private readonly logger = new Logger(UsersService.name);

//     constructor() {
//         this.openai = new OpenAI({
//             apiKey: "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",
//         });
//     }

//     async generatePromptFromImage(imagePath: string, prompt: string): Promise<string> {
//         try {
//             if (!fs.existsSync(imagePath)) {
//                 this.logger.error(`File does not exist: ${imagePath}`);
//                 return "Error: File not found.";
//             }
            
//             // For createVariation, we need a file stream
//             const response = await this.openai.images.createVariation({
//                 model: "dall-e-2",
//                 image: fs.createReadStream(imagePath),
//                 n: 1,
//             });
            
//             this.logger.log("OpenAI response received successfully");
            
//             // Extracting the URL from the response
//             const generatedImageUrl = response.data[0]?.url ?? "No image generated";
//             return generatedImageUrl;
//         } catch (error) {
//             // Handle specific error types
//             if (error.code === 'billing_hard_limit_reached') {
//                 this.logger.error('OpenAI billing limit reached. Please check your account.');
//                 return "Error: OpenAI billing limit reached. Please check your account settings.";
//             } else if (error.status === 429) {
//                 this.logger.error('OpenAI rate limit exceeded.');
//                 return "Error: Rate limit exceeded. Please try again later.";
//             } else {
//                 this.logger.error(`Error generating image variation: ${error.message}`, error.stack);
//                 return "Error processing image.";
//             }
//         }
//     }
// }



import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class UploadsService {
    private openai = new OpenAI({
        apiKey: "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", // Use environment variable
    });

    async generatePromptFromImage(imagePath: string, prompt: string): Promise<any[]> {
        try {
            const variations: any[] = [];

            
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
        } catch (error) {
            console.error('Error generating image variation:', error);
            throw new Error('Failed to generate image variation');
        }
    }
}
