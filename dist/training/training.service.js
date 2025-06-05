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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const training_schema_1 = require("./schemas/training.schema");
let TrainingService = class TrainingService {
    trainingModel;
    constructor(trainingModel) {
        this.trainingModel = trainingModel;
    }
    async create(createTrainingDto) {
        const newTraining = new this.trainingModel(createTrainingDto);
        return newTraining.save();
    }
    async findAllForUser(userId) {
        return this.trainingModel.find({ userId }).sort({ date: -1 }).exec();
    }
    async findOneForUser(id, userId) {
        const training = await this.trainingModel
            .findOne({ _id: id, userId })
            .exec();
        if (!training) {
            throw new common_1.NotFoundException(`Training not found or unauthorized`);
        }
        return training;
    }
    async remove(id, userId) {
        const result = await this.trainingModel.findOneAndDelete({
            _id: id,
            userId,
        });
        if (!result) {
            throw new common_1.NotFoundException('Training not found or unauthorized');
        }
    }
    async update(id, updateDto) {
        const training = await this.trainingModel.findOne({
            _id: id,
            userId: updateDto.userId,
        });
        if (!training) {
            throw new common_1.NotFoundException('Training not found or unauthorized');
        }
        Object.assign(training, updateDto);
        return training.save();
    }
};
exports.TrainingService = TrainingService;
exports.TrainingService = TrainingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(training_schema_1.Training.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TrainingService);
//# sourceMappingURL=training.service.js.map