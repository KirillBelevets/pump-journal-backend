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
exports.TrainingSchema = exports.Training = exports.HeartRateSchema = exports.HeartRate = exports.ExerciseSchema = exports.Exercise = exports.SetSchema = exports.Set = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Set = class Set {
    reps;
    weight;
    comment;
};
exports.Set = Set;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Set.prototype, "reps", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Set.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Set.prototype, "comment", void 0);
exports.Set = Set = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Set);
exports.SetSchema = mongoose_1.SchemaFactory.createForClass(Set);
let Exercise = class Exercise {
    name;
    rest;
    tempo;
    sets;
    comment;
};
exports.Exercise = Exercise;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Exercise.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Exercise.prototype, "rest", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Exercise.prototype, "tempo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.SetSchema], required: true }),
    __metadata("design:type", Array)
], Exercise.prototype, "sets", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Exercise.prototype, "comment", void 0);
exports.Exercise = Exercise = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Exercise);
exports.ExerciseSchema = mongoose_1.SchemaFactory.createForClass(Exercise);
let HeartRate = class HeartRate {
    start;
    end;
};
exports.HeartRate = HeartRate;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], HeartRate.prototype, "start", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], HeartRate.prototype, "end", void 0);
exports.HeartRate = HeartRate = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], HeartRate);
exports.HeartRateSchema = mongoose_1.SchemaFactory.createForClass(HeartRate);
let Training = class Training extends mongoose_2.Document {
    userId;
    date;
    dayOfWeek;
    timeOfDay;
    goal;
    heartRate;
    exercises;
    sessionNote;
};
exports.Training = Training;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Training.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Training.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Training.prototype, "dayOfWeek", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Training.prototype, "timeOfDay", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Training.prototype, "goal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.HeartRateSchema }),
    __metadata("design:type", HeartRate)
], Training.prototype, "heartRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.ExerciseSchema], required: true }),
    __metadata("design:type", Array)
], Training.prototype, "exercises", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Training.prototype, "sessionNote", void 0);
exports.Training = Training = __decorate([
    (0, mongoose_1.Schema)()
], Training);
exports.TrainingSchema = mongoose_1.SchemaFactory.createForClass(Training);
//# sourceMappingURL=training.schema.js.map