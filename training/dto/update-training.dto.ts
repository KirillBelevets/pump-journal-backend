import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainingDto } from './create-tratining.dto';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {}
