"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTrainingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tratining_dto_1 = require("./create-tratining.dto");
class UpdateTrainingDto extends (0, mapped_types_1.PartialType)(create_tratining_dto_1.CreateTrainingDto) {
}
exports.UpdateTrainingDto = UpdateTrainingDto;
//# sourceMappingURL=update-training.dto.js.map