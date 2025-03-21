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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSchema = exports.Image = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Image = class Image extends mongoose_2.Document {
    filename;
    modelName;
    triggerWord;
    originalUrl;
    convertedUrl;
};
exports.Image = Image;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Image.prototype, "filename", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Image.prototype, "modelName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Image.prototype, "triggerWord", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Image.prototype, "originalUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Image.prototype, "convertedUrl", void 0);
exports.Image = Image = __decorate([
    (0, mongoose_1.Schema)()
], Image);
exports.ImageSchema = mongoose_1.SchemaFactory.createForClass(Image);
//# sourceMappingURL=images.entity.js.map